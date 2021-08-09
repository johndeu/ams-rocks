import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// Use the react-intersection-observer to trigger animations when stuff is in view
import { useInView } from "react-intersection-observer";

// Use framer-motion
import { motion, useAnimation } from "framer-motion";

// core components
import styles from "styles/jss/nextjs-material-kit/components/cardStyle.js";
import { CHAR_0 } from "picomatch/lib/constants";

const useStyles = makeStyles(styles);

export default function Card(props) {
  const classes = useStyles();
  const { className, children, plain, carousel, ...rest } = props;
  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardCarousel]: carousel,
    [className]: className !== undefined,
  });

  const { ref, inView } = useInView({ threshold: 0.2 });

  const animation = useAnimation();

  React.useEffect(() => {
    if (inView) {
      animation.start(
        {
          x: 0,
          opacity:1,
          transition: {
            type: 'spring',
            duration: 0.6,
            bounce: 0.5
          }
        }
      )
    } else {
      animation.start(
        {
          x: "-15vw", // vw= viewport width
          opacity:0
        }
      )
    }
    console.log("Card: use effect hook Card is InView = ", inView);
  }, [inView]);


  return (
    <motion.div ref={ref} animate={animation}>
      <div className={cardClasses} {...rest}>
        {children}
      </div>
    </motion.div>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  plain: PropTypes.bool,
  carousel: PropTypes.bool,
  children: PropTypes.node,
};
