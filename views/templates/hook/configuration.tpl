
{if $orejime}
    {literal}
        <script>
            var getLang = function() {
                var _lang = document.documentElement.lang;
                var _translations = {
                    lang: _lang === 'fr' ? 'fr' : 'en',
                    privacyPolicy: _lang === 'fr-FR' ? '/mentions-legales' : '/en/legal-notice/',
                    apps: {
                        fr: [{
                                name: "prestashop",
                                title: "Les cookies qui sont strictement nécessaires",
                                purposes: ["security", "usepref"],
                                description: "Il s'agit de cookies qui sont essentiels pour vous fournir le Site Internet et les Services et pour en utiliser certaines fonctionnalités, par exemple pour vous aider à vous connecter sur des zones sécurisées du Site Internet.",
                                required: true,
                                cookie: [
                                    "_fbp"
                                ]

                            },
                            {
                                name: "google",
                                title: "Cookies de performance et de mesure d'audience",
                                description: "Nous partageons également des informations, quant à votre navigation sur notre site, avec nos partenaires analytiques, publicitaires et de réseaux sociaux.",
                                purposes: ["analytics", "security"],
                                required: false,
                                cookies: [
                                    "_ga",
                                    "_gat",
                                    "_gid",
                                    "__utma",
                                    "__utmb",
                                    "__utmc",
                                    "__utmt",
                                    "__utmz"
                                ],
                            },
                            {
                                name: "social",
                                title: "Social",
                                purposes: ["social"],
                                description: "Ces cookies vous permettent d’interagir avec les modules sociaux présents sur le site.",
                                required: false,
                                cookie: [
                                    "_social"
                                ]
                            },
                            {
                                name: "publicity",
                                title: "Publicité",
                                purposes: ["publicity"],
                                description: "Ces cookies permettent de mieux cibler les publicités qui vous sont proposées sur Internet.",
                                required: false,
                                cookie: [
                                    "_pub"
                                ]
                            },
                        ],
                        en: [{
                                name: "prestashop",
                                title: "Cookies that are necessary for essential purposes",
                                purposes: ["security", "usepref"],
                                description: "These cookies are essential to provide you with the Website and Services and to use some of its features, such as to enable you to log into secure areas of the Website.",
                                required: true,
                                cookie: [
                                    "_fbp"
                                ]
                            },
                            {
                                name: "google",
                                title: "Performance and Analytics Cookies",
                                description: "We also share information about your browsing on our site, with our analytic partners, advertising and social networks.",
                                purposes: ["analytics", "security"],
                                required: false,
                                cookies: [
                                    "_ga",
                                    "_gat",
                                    "_gid",
                                    "__utma",
                                    "__utmb",
                                    "__utmc",
                                    "__utmt",
                                    "__utmz"
                                ]
                            },
                            {
                                name: "social",
                                title: "Social",
                                purposes: ["social"],
                                description: "These cookies allow you to interact with the social modules on the site.",
                                required: false,
                                cookie: [
                                    "_social"
                                ]
                            },
                            {
                                name: "publicity",
                                title: "Publicity",
                                purposes: ["publicity"],
                                description: "These cookies allow you to better target the advertisements that are offered to you on the Internet..",
                                required: false,
                                cookie: [
                                    "_pub"
                                ]
                            },
                        ]
                    }
                };

                return _translations;
            };

            var _translation = getLang();
            var orejimeConfig = {
                cookieName: "orejime",
                cookieExpiresAfterDays: 365,
                privacyPolicy: _translation.privacyPolicy,
                default: true,
                mustConsent: false,
                implicitConsent: false,
                lang: _translation.lang,
                translations: {
                    fr: {
                        consentModal: {
                            title: "Les informations que nous collectons",
                            description: "Ici, vous pouvez voir et personnaliser les informations que nous collectons sur vous.\n",
                            privacyPolicy: {
                                name: "Politique de confidentialité",
                                text: "Pour en savoir plus, merci de lire notre {privacyPolicy}.\n"
                            }
                        },
                        consentNotice: {
                            changeDescription: "Des modifications ont eu lieu depuis votre dernière visite, merci de mettre à jour votre consentement.",
                            description: "Ce site utilise des cookies afin d'améliorer votre expérience et optimiser nos services.\n",
                            learnMore: "Paramétrer"
                        },
                        accept: "Accepter",
                        acceptAll: "Tout accepter",
                        ok: "OK",
                        save: "Sauvegarder",
                        saveData: "Sauvegarder ma configuration sur les informations collectées",
                        decline: "Refuser",
                        declineAll: "Tout refuser",
                        close: "Fermer",
                        enabled: "Activé",
                        disabled: "Désactivé",
                        app: {
                            optOut: {
                                title: "(opt-out)",
                                description: "Cette application est chargée par défaut (mais vous pouvez la désactiver)"
                            },
                            required: {
                                title: "(toujours requis)",
                                description: "Cette application est toujours requise"
                            },
                            purposes: "Utilisations",
                            purpose: "Utilisation"
                        },
                        poweredBy: "",
                        newWindow: "nouvelle fenêtre",
                        purposes: {
                            analytics: "Analyses d\'audience",
                            security: "Securité",
                            usepref: "Préférences utilisateurs",
                            social: "Social",
                            publicity: "Publicité"
                        }
                    },
                    en: {
                        consentModal: {
                            title: "Information that we collect",
                            description: "Here, you can see and customize the information we collect about you.\n",
                            privacyPolicy: {
                                name: "Privacy policy",
                                text: "To learn more, please read our {privacyPolicy}.\n"
                            }
                        },
                        consentNotice: {
                            changeDescription: "Modifications have occurred since your last visit, thank you for updating your consent.",
                            description: "This site uses cookies to guarantee you the best experience on our site.\n",
                            learnMore: "Learn more"
                        },
                        accept: "Accept",
                        acceptAll: "Accept all",
                        ok: "OK",
                        save: "Save",
                        saveData: "Back up my configuration on the information collected",
                        decline: "Refuse",
                        declineAll: "Refuse all",
                        close: "Close",
                        enabled: "Enabled",
                        disabled: "Disabled",
                        app: {
                            optOut: {
                                title: "(opt-out)",
                                description: "This application is loaded by default (but you can disable it)"
                            },
                            required: {
                                title: "(always required)",
                                description: "This application is always required"
                            },
                            purposes: "uses",
                            purpose: "use"
                        },
                        poweredBy: "",
                        newWindow: "new window",
                        purposes: {
                            analytics: "Audience analysis",
                            security: "Security",
                            usepref: "User preferences",
                            social: "Social",
                            publicity: "Publicity"
                        }
                    }
                },
                apps: _translation.lang === 'fr' ? _translation.apps.fr : _translation.apps.en
            }
        </script>
    {/literal}
{/if}

{* Google analytics *}
{if $google_analytics}
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script data-type="application/javascript" data-name="google" type="opt-in" async data-src="https://www.googletagmanager.com/gtag/js?id={$google_analytics_id}"></script>
    <script data-type="application/javascript" data-name="google" type="opt-in" >
        window.dataLayer = window.dataLayer || [];
        function gtag(){
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', '{$google_analytics_id}');
    </script>
    <!-- End Google Tag Manager -->
{/if}
