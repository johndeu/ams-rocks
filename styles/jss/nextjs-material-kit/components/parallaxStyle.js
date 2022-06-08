const parallaxStyle = (theme) => ({
  parallax: {
    height: "30vh",
    maxHeight: "1000px",
    overflow: "hidden",
    position: "relative",
    backgroundPosition: "left center",
    backgroundSize: "cover",
    margin: "0",
    padding: "0",
    border: "0",
    display: "flex",
    alignItems: "center",
  },
  filter: {
    "&:before": {
      background: "rgba(0, 0, 0, 0.5)",
    },
    "&:after,&:before": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: "''",
    },
  },
  small: {
    height: "300px",
  },
  parallaxResponsive: {
    [theme.breakpoints.down("lg")]: {
      minHeight: "500px",
    },
    [theme.breakpoints.down("md")]: {
      minHeight: "540px",
    },
    [theme.breakpoints.down("sm")]: {
      minHeight: "600px",
    },
    [theme.breakpoints.down("xs")]: {
      minHeight: "620px",
    },
  },
});

export default parallaxStyle;
