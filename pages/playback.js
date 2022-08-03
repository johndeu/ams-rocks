import { useEffect } from 'react';
import { useRouter } from 'next/router';

import i18next from 'i18next';

import { getSortedLangsData } from '../lib/lang';

export default function Playback({ allLangsData }) {
	const router = useRouter();

	useEffect(() => {
		const { pathname} = router;
		if (pathname == '/playback') {
			router.push( {
				pathname: '/' + i18next.language.substring(0, 2) + '/playback',
				query: router.query
		});
		}
	});

	return null;
}

