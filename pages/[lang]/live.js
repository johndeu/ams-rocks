import React, { useState, setState, useEffect, useRef } from "react";
import dynamic from 'next/dynamic';
import moment from "moment";

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// Use framer-motion
import { motion } from "framer-motion";
// Use the react-intersection-observer to trigger animations when stuff is in view
import { useInView } from "react-intersection-observer";

// React-ChartJS-2 imports
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import AzureFooter from "components/Footer/AzureFooter.js";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinksLeft from "components/Header/HeaderLinks-left.js";
import HeaderLinksRight from "components/Header/HeaderLinks-right.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Badge from "components/Badge/Badge.js";
import Button from "components/CustomButtons/Button.js";

// Sections for this page
import FreeSection from "pages-sections/LandingPage-Sections/FreeSection.js";
import FreeLive from "pages-sections/LandingPage-Sections/SectionFreeLive.js";

// Need to dynamic load the Shaka Player since it imports a standard Javascript library
// See the documentation here - https://github.com/amit08255/shaka-player-react-with-ui-config/tree/master/nextjs-shaka-player
const ShakaPlayer = dynamic(import("components/ShakaPlayer/ShakaPlayerClass.js"), { ssr: false });

import styles from "styles/jss/nextjs-material-kit/pages/livePage.js";
import Hidden from "@material-ui/core/Hidden";

// Sections for this page

// Translations
import { useRouter } from 'next/router';
import i18next from 'i18next';
import { getAllLanguageSlugs, getLanguage } from '../../lib/lang';
const dashboardRoutes = [];

const useStyles = makeStyles(styles);
const STREAMS = [
  {
    name: 'AMS LL-HLS Demo Stream',
    src: 'https://aka.ms/LowLatencyDemo.m3u8',
    location: "US East"
  }
];

// Chart options
const chartOptions = {
  responsive: true,
  redraw: true,
  updateMode: "active",
  animations: {
    tension: {
      duration: 500,
      easing: 'easeOutQuart'
    }
  },
  scales: {
    y: {

      suggestedMax: 10,
      suggestedMin: 0,
      grid: {
        display: true,
        borderColor: "black",
        tickColor: "black"
      },
      title: {
        display: true,
        text: "Latency in Seconds",
        color: "blue",
        font: {
          size: 12,
          weight: "bold"
        }
      },
    },
    x: {
      title: {
        display: true,
        text: "UTC time",
        color: "blue",
        font: {
          size: 12,
          weight: "bold"
        }
      }
    }
  },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Latency',
    },
  }
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const labels = [];

export const chartData = {
  labels,
  datasets: [{
    label: 'Latency (seconds)',
    data: [5],
    borderColor: '#004E8C',
    backgroundColor: '#004E8C',
  }
  ],
};
// End Chart options

export default function LandingPage(props) {
  const classes = useStyles();
  const router = useRouter();

  const { ...rest } = props;
  const ref = useRef();
  const chartRef = useRef();
  const [src, setSrc] = useState(STREAMS[0].src);
  const [location, setLocation] = useState(STREAMS[0].location);
  const [stats, setStats] = useState({});
  const [bufferTime, setBufferTime] = useState(30); //default for Shaka player is 30 seconds of buffer
  const [playHeadTime, setPlayHeadTime] = useState(moment.utc());
  const [presentationStartTime, setPresentationStartTime] = useState(Date.now());
  const [currentTime, setCurrentTime] = useState(moment.utc().format("YYYY-MM-DD HH:mm:ss"));
  const [latency, setLatency] = useState(6000);
  const [userAgent, setUserAgent] = useState("");
  const [isIos, setIsIos] = useState(false);

  // On page loaded
  useEffect(() => {
    setUserAgent(navigator.userAgent);
    setIsIos(/iPhone/.test(userAgent));

    onDemand = onDemandLoaded;
  })


  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const playerClasses = classNames(
    classes.player,
    classes.imgRaised,
    classes.imgRoundedCircle,
  );


  function onStatsUpdate(statsUpdate, startTime) {

    if (statsUpdate) {
      setStats(statsUpdate);
    }

    if (startTime) {
      setPresentationStartTime(startTime);
    }

  }

  function onBufferedInfoUpdate(info) {

    if (info !== undefined) {

      if (info.total[0]) {
        var rangeStart = info.total[0].start;
        var rangeEnd = info.total[0].end;
        setBufferTime((rangeEnd - rangeStart));
      }
    }
  }

  function onLatencyUpdate(latency){
    setLatency(latency);

    chartData.datasets[0].data.push(latency.valueOf());
    chartData.labels.push(moment().utc().format("HH:mm:ss"));
    if (chartData.labels.length > 30) {  // keep a sliding window
      chartData.datasets[0].data.shift(); //shift off the oldest data
      chartData.labels.shift(); //shift off the oldest label to keep the window sliding.
    }
    if (chartRef.current) {
      chartRef.current.update('active');
    }

  }

  function onPlayHeadTimeUpdate(time) {
    var currentTime = getCurrentTimeUTC();
    setCurrentTime(currentTime);

    if (time) {
      setPlayHeadTime(time);
    }

  }

  function getCurrentTimeUTC() {
    var currentTime;
    var now = moment();
    currentTime = now.utc().format("YYYY-MM-DD HH:mm:ss");
    return currentTime;
  }

  var onDemand =
    <>
      <div></div>
    </> //Empty block for when the page loads and the asset is not yet on-demand

  const onDemandLoaded =
    <Card className={classes.onDemandBox} md={2}>
      <Badge color="white" className={classes.onDemandTitle}>{i18next.t("liveDemo.onDemand")}:</Badge>
      <CardBody className={classes.cardBody}>
        <span className={classes.onDemandMessage}>{i18next.t("liveDemo.onDemandMessage")}</span>
      </CardBody>
    </Card>

  const metricGrid =
    <GridContainer>
      {!isIos && !isNaN(stats.liveLatency) &&
        <GridItem md={6}>
          <Card className={classes.card} md={2}>
            <Badge color="white"><span className={classes.label}>{i18next.t("liveDemo.metrics.latency")}</span></Badge>
            <CardBody className={classes.cardBody}>
              <span className={classes.metric}>{latency && (latency).toPrecision(4) + "s"}</span>
            </CardBody>
          </Card>
        </GridItem>
      }
      {!isIos && !isNaN(stats.liveLatency) &&
        <GridItem md={6}>
          <Card className={classes.card} md={2}>
            <Badge color="white"><span className={classes.label}>{i18next.t("liveDemo.metrics.bandwidth")}</span></Badge>
            <CardBody className={classes.cardBody}>
              <span className={classes.metric}>{stats.estimatedBandwidth ? (stats.estimatedBandwidth / 1024).toFixed() + '' : i18next.t("liveDemo.metrics.estimating")}</span>
            </CardBody>
          </Card>
        </GridItem>
      }
      {!isIos && !isNaN(stats.liveLatency) &&
        <GridItem md={6}>
          <Card className={classes.card}>
            <Badge color="white"><span className={classes.label}>{i18next.t("liveDemo.metrics.quality")}</span></Badge>
            <CardBody className={classes.cardBody}>
              <span className={classes.metric}>{stats.height ? stats.height + 'p' : i18next.t("liveDemo.metrics.loading")}</span>
            </CardBody>
          </Card>
        </GridItem>
      }
      {!isNaN(stats.liveLatency) &&
        <GridItem md={6}>
          <Card className={classes.card}>
            <Badge color="white"><span className={classes.label}>{i18next.t("liveDemo.metrics.streamedFrom")}</span></Badge>
            <CardBody className={classes.cardBody}>
              <span className={classes.metric}>{location}</span>
            </CardBody>
          </Card>
        </GridItem>
      }
    </GridContainer>


  return (
    <div >
      <Header
        color="white"
        routes={dashboardRoutes}
        brand={i18next.t('landing.title')}
        leftLinks={<HeaderLinksLeft />}
        rightLinks={<HeaderLinksRight />}
        fixed
        changeColorOnScroll={{
          height: 120,
          color: "white",
        }}
        {...rest}
      />
      <div className={classes.subHeaderBanner} >
        <h3>{i18next.t("liveDemo.title")}</h3>
      </div>
      <div className={classes.section}>
        <div className={classes.container}>
          <div className={classes.learnMore} >
            {i18next.t('liveDemo.callToAction')}
            <a href='https://docs.microsoft.com/azure/media-services/latest/live-event-latency-reference' target='_blank'> {i18next.t('liveDemo.callToActionLink')}</a>
          </div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={7} className={playerClasses} >

                  <ShakaPlayer
                    src={src}
                    posterUrl=""
                    stats={stats}
                    raised
                    onStatsUpdate={onStatsUpdate}
                    onBufferedInfoUpdate={onBufferedInfoUpdate}
                    onPlayHeadTimeUpdate={onPlayHeadTimeUpdate}
                    onLatencyUpdate={onLatencyUpdate}
                  />

                  {isNaN(stats.liveLatency) &&
                    <>
                      {onDemand}
                    </>
                  }

                  <Card className={classes.utcTimeBox} md={2}>
                    <Badge color="white" className={classes.utcTimeLabel}>{i18next.t("liveDemo.metrics.utcClock")}:</Badge>
                    <CardBody className={classes.cardBody}>
                      <span className={classes.localTime}>{currentTime}</span>
                    </CardBody>
                  </Card>

                  {!isIos && !isNaN(stats.liveLatency) &&
                    <>
                      <Card className={classes.utcTimeBox} md={2}>
                        <CardBody className={classes.cardBody}>
                          <Line ref={chartRef} options={chartOptions} data={chartData} />
                        </CardBody>
                      </Card>

                      <p className={classes.playerNotes}>* {i18next.t('liveDemo.playerNotes', { playerVersion: "4.1.1" })}</p>
                      <p className={classes.playerNotes}>{i18next.t('liveDemo.clockNotes')}</p>
                    </>
                  }

                  {!isIos &&
                    <Hidden smUp>
                      {metricGrid}
                    </Hidden>
                  }

                </GridItem>

                <GridItem xs={12} sm={12} md={5}>
                  {!isIos &&
                    <Hidden xsDown >
                      {metricGrid}
                    </Hidden>
                  }
                  <Card className={classes.card}>
                    <CardHeader className={classes.featureHeader}>
                      {i18next.t('liveDemo.features.title')}
                    </CardHeader>
                    <CardBody className={classes.featureBody}>
                      <ul>
                        {i18next.t("liveDemo.features.list", { returnObjects: true }).map((listItem) => {
                          return <li>{listItem.item}</li>
                        })}
                      </ul>
                    </CardBody>
                  </Card>
                </GridItem>


              </GridContainer>
            </GridItem>
          </GridContainer>

        </div>
        <FreeSection />
        <AzureFooter></AzureFooter>
     {/*    <Footer whiteFont logoColor="gray" /> */}
      </div>

    </div>
  );
}

export async function getStaticPaths() {
  const paths = getAllLanguageSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const language = getLanguage(params.lang);
  return {
    props: {
      language,
    },
  };
}