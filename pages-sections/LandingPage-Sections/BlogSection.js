import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "styles/jss/nextjs-material-kit/pages/landingPageSections/teamStyle.js";

// Blog components
import { getAllPosts } from 'lib/api.js'
import { CMS_NAME } from 'lib/constants.js'
import HeroPost from 'components/Blog/HeroPost'

const useStyles = makeStyles(styles);


export default function BlogSection({ allPosts }) {
    const classes = useStyles();
    const heroPost = allPosts[0]
    const morePosts = allPosts.slice(1)

    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
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

                </div>
        </>
    );
}

