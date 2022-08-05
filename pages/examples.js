import { useEffect } from 'react';
import { useRouter } from 'next/router';

import i18next from 'i18next';

import { getSortedLangsData } from '../lib/lang';

// This page will route to the folder [lang]/examples.js

export default function Examples({ allLangsData }) {
	const router = useRouter();

	useEffect(() => {
		const { pathname } = router;
		if (pathname == '/examples') {
			router.push('/' + i18next.language + '/examples');
		}
	});

	return null;
}

