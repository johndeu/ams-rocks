import { useEffect } from 'react';
import { useRouter } from 'next/router';

import i18next from 'i18next';

import { getSortedLangsData } from '../lib/lang';

export default function Demo({ allLangsData }) {
	const router = useRouter();

	useEffect(() => {
		const { pathname } = router;
		if (pathname == '/demo') {
			router.push('/' + i18next.language + '/demo');
		}
	});

	return null;
}

