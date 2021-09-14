
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import styles from "styles/jss/nextjs-material-kit/pages/landingPageSections/teamStyle.js";

// Blog components
import HeroPost from 'components/Blog/HeroPost'
import MoreStories from 'components/Blog/moreStories'

const useStyles = makeStyles(styles);

export default function BlogIndex({allPosts}) {
    const classes = useStyles();
    const heroPost = allPosts.allPosts[0]
    const morePosts = allPosts.allPosts.slice(1)

    return (
        <>
                <div className={classes.section}>
                    <h2 className={classes.title}>Here is our blog</h2>
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
                      {morePosts.length > 0 && <MoreStories posts={morePosts} />}
                </div>
        </>
    );
}

