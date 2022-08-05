import { useEffect } from 'react';
import { useRouter } from 'next/router';

import i18next from 'i18next';

import { getSortedLangsData } from '../lib/lang';

// This page will route to the folder [lang]/live.js

export default function Examples({ allLangsData }) {
	const router = useRouter();

	useEffect(() => {
		const { pathname } = router;
		if (pathname == '/live') {
			router.push('/' + i18next.language + '/live');
		}
	});

	return null;
}

