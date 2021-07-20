
// nodejs library that concatenates classes
import classNames from "classnames";
import styles from "styles/jss/nextjs-material-kit/pages/landingPageSections/teamStyle.js";

// Blog components
import { getAllPosts } from 'lib/api.js'
import { CMS_NAME } from 'lib/constants.js'
import HeroPost from 'components/Blog/HeroPost'
import BlogIndex from 'components/Blog/blogIndex'


export default function Index({ allPosts }) {
    const heroPost = allPosts[0]
    const morePosts = allPosts.slice(1)
    return (
        <>
            <BlogIndex allPosts={allPosts}></BlogIndex>

            {heroPost && (
                <HeroPost
                    title={heroPost.title}
                    coverImage={heroPost.coverImage}
                    date={heroPost.date}
                    author={heroPost.author}
                    slug={heroPost.slug}
                    excerpt={heroPost.excerpt}
                />
            )}

        </>
    )
}

export async function getStaticProps() {
    const allPosts = getAllPosts([
        'title',
        'date',
        'slug',
        'author',
        'coverImage',
        'excerpt',
    ])

    return {
        props: { allPosts },
    }
}
