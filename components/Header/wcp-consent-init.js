//let siteConsent;
//let WcpConsent = window.WcpConsent;

//Init method 
WcpConsent && WcpConsent.init("en-US", "cookie-banner", (err, _siteConsent) => {
    if (err) {
        alert(err);
    } else {
        siteConsent = _siteConsent;
        console.log("getConsent()", siteConsent.getConsent());
        console.log("getConsent().Required", siteConsent.getConsent().Required);
    }
}, onConsentChanged);

//call back method when consent is changed by user
function onConsentChanged(newConsent) {
    console.log("onConsentChanged", newConsent);
    console.log("getConsent()", siteConsent.getConsent());
    console.log("getConsentFor(wcpConsentCategory.Required)", siteConsent.getConsentFor(WcpConsent.consentCategories.Required));
    console.log("getConsentFor(wcpConsentCategory.ThirdPartyAnalytics)", siteConsent.getConsentFor(WcpConsent.consentCategories.Analytics));
    console.log("getConsentFor(wcpConsentCategory.SocialMedia)", siteConsent.getConsentFor(WcpConsent.consentCategories.SocialMedia));
    console.log("getConsentFor(wcpConsentCategory.Advertising)", siteConsent.getConsentFor(WcpConsent.consentCategories.Advertising));
}

function manageConsent() {
    siteConsent.manageConsent();
}

