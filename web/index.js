const express = require("express");
const ejs = require("ejs");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const Strategy = require("passport-discord").Strategy;
const MemoryStore = require("memorystore")(session);
const url = require("url");

const config = require('../config')
const app = express();

module.exports = async(discordClient, twitchClient) => {
        const dataDir = path.resolve(`${process.cwd()}${path.sep}/web`); //Set the main directory for the web filesq
        const templateDir = path.resolve(`${dataDir}${path.sep}views${path.sep}pages`); //Set the directory for the pages

        var callbackUrl;
        var domain;

        try {
            const domainUrl = new URL(config.dashboard.domain);
            domain = {
                host: domainUrl.hostname,
                protocol: domainUrl.protocol,
            };
        } catch (e) {
            console.log(e);
            throw new TypeError("Invalid domain specific in the config file.");
        }

        if (config.dashboard.usingCustomDomain) callbackUrl = `${domain.protocol}//${domain.host}/callback`;
        else callbackUrl = `${domain.protocol}//${domain.host}${config.dashboard.port == 80 ? "" : `:${config.dashboard.port}`}/callback`;

    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((obj, done) => done(null, obj))

    passport.use(new Strategy({
            clientID: config.dashboard.clientID,
            clientSecret: config.dashboard.clientSecret,
            callbackURL: callbackUrl,
            scope: ["identify", "email", "guilds"],
        },
        (accessToken, refreshToken, profile, done) => {
            process.nextTick(() => done(null, profile));
        }
    ));

    app.use(session({
        store: new MemoryStore({
            checkPeriod: 86400000
        }),
        secret: "HypnoticSiege",
        resave: false,
        saveUninitialized: false,
    }));

    app.use(session({
        secret: "hypnoticsiege",
        resave: false,
        saveUninitialized: false
    }));

    const renderTemplate = (res, req, template, data = {}) => {
        const base = {
            discord: discordClient,
            twitch: twitchClient,
            config: config,
            user: req.isAuthenticated() ? req.user : null,
        };
        res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(base, data));
    }

    const checkAuth = (req, res, next) => {
        if (req.isAuthenticated()) return next();
        req.session.backURL = req.url;
        res.redirect("/login");
    }

    app.locals.domain = config.dashboard.domain.split("//")[1];
    app.engine("html", ejs.renderFile); //Set the engine for the pages
    app.set("view engine", "html"); //Set the view engine to html
    app.listen(config.dashboard.port); //Start the server on the port specified in the config
    app.use(bodyParser.json()); //Set the body parser to json
    app.use(bodyParser.urlencoded({
        extended: true
    })); //Set the body parser to urlencoded
    app.use(passport.initialize()); //Initialize passport
    app.use(passport.session()); //Set the session for passport

    app.use("/", express.static(path.resolve(`${dataDir}${path.sep}public`))); //Set the public directory


    app.get("/login", (req, res, next) => {
            if (req.session.backURL) {
                req.session.backURL = req.session.backURL;
            } else if (req.headers.referer) {
                const parsedData = url.parse(req.url);
                if (parsedData.hostname === app.locals.domain) {
                    req.session.backURL = parsedData.path;
                }
            } else {
                req.session.backURL = "/";
            }
            next();
        },
        passport.authenticate("discord"));

    app.get("/callback", passport.authenticate("discord", {
        failureRedirect: "/login"
    }), (req, res) => {
        if (req.session.backURL) {
            const url = req.session.backURL;
            req.session.backURL = null;
            res.redirect(url);
        } else {
            res.redirect("/");
        };
    });

    app.get("/logout", function (req, res) {
        req.session.destroy(() => {
            req.logOut();
            res.redirect("/");
        });
    });

    app.get("/", checkAuth, (req, res) => {
        renderTemplate(res, req, "index.ejs");
    });
}