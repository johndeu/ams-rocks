import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { languages, defaultLanguage } from './config';

const locales = Object.assign(
	{},
	...Object.keys(languages).map((index) => {
		return {
			[languages[index]]: {
				translations: require('../locales/' + languages[index] + '/' + languages[index] + '.json'),
			},
		};
	}),
);

const detection = {
	// order and from where user language should be detected
	order: [
		'querystring',
		'navigator',
		'localStorage',
		'sessionStorage',
		'htmlTag',
		'path',
		'subdomain',
	],

	// keys or params to lookup language from

	lookupLocalStorage: 'lng',
	lookupFromPathIndex: 0,
	lookupFromSubdomainIndex: 0,

	// cache user language on
	caches: ['localStorage'],
	excludeCacheFor: ['cookie','cimode'], // languages to not persist (cookie, localStorage)

	// optional set cookie options, reference:[MDN Set-Cookie docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
	//cookieOptions: { path: '/', sameSite: 'strict' },
};

i18next.use(LanguageDetector).init({
	detection: detection,
	lng: defaultLanguage,
	fallbackLng: defaultLanguage,
	resources: locales,
	ns: ['translations'],
	defaultNS: 'translations',
	returnObjects: true,
	nonExplicitSupportedLngs: false,
	lowerCaseLng:true,
	debug: false,
	interpolation: {
		escapeValue: false, // not needed for react!!
	},
	react: {
		wait: true,
	},
});

export default i18next;