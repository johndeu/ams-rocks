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
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinksLeft from "components/Header/HeaderLinks-left.js";
import HeaderLinksRight from "components/Header/HeaderLinks-right.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Badge from "components/Badge/Badge.js";

// Sections for this page
import FreeSection from "pages-sections/LandingPage-Sections/FreeSection.js";

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
    name: 'Mux Live Low Latency',
    src:
      'https://stream.mux.com/v69RSHhFelSm4701snP22dYz2jICy4E4FUyk02rW4gxRM.m3u8',
    location: "Unknown"
  },
  {
    name: 'AMS LL-HLS Demo Stream',
    src: 'https://aka.ms/LowLatencyDemo.m3u8',
    location: "US West"
  },
  {
    name: 'Azure Media Services LL Demo full link',
    src: 'https://lldemo-usw22.streaming.media.azure.net/6db0506b-6608-4ec1-96ee-513a596408e4/manifest.ism/QualityLevels(128000)/Manifest(audio_und,format=m3u8-cmaf)',
    location: "US West"
  }
];

// Chart options
const chartOptions = {
  responsive: true,
  redraw: true,
  updateMode: "active",
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Latency',
    },
  },
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
    data: [6],
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
  const [src, setSrc] = useState(STREAMS[1].src);
  const [location, setLocation] = useState(STREAMS[1].location);
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
        //console.log("buffered time: " + (rangeEnd - rangeStart))
        setBufferTime((rangeEnd - rangeStart));
      }
    }
  }

  function onPlayHeadTimeUpdate(time) {
    //console.log("PlayHeadTime: " + time)
    var currentTime = getCurrentTimeUTC();
    setCurrentTime(currentTime);

    if (time) {
      var now = moment().utc();
      //console.log("CurrentTime: " + now)
      var latency = now.subtract(time);
      //console.log("Latency: " + latency)
      setPlayHeadTime(time);
      setLatency(latency)

      chartData.datasets[0].data.push(latency.valueOf()/1000);
      chartData.labels.push(moment().utc().format("HH:mm:ss"));
      if (chartData.labels.length > 30){  // keep a 10 second window
        chartData.datasets[0].data.shift(); //shift off the oldest data
        //console.log(chartData.datasets[0].data);
        chartData.labels.shift(); //shift off the oldest label to keep the window sliding.
      }
      chartRef.current.update('active');
    }

  }

  function getCurrentTimeUTC() {
    var currentTime;
    var now = moment();
    currentTime = now.utc().format("YYYY-MM-DD HH:mm:ss");
    return currentTime;
  }

  const metricGrid =
    <GridContainer>
      {/*       <GridItem md={6}>
        <Card className={classes.card} md={2}>
          <Badge color="azure"><span className={classes.label}>Latency (Stats)</span></Badge>
          <CardBody className={classes.cardBody}>
            <span className={classes.metric}>{stats.liveLatency ? stats.liveLatency.toPrecision(4) + 's' : 'measuring'}</span>
          </CardBody>
        </Card>
      </GridItem> */}
      <GridItem md={6}>
        <Card className={classes.card} md={2}>
          <Badge color="white"><span className={classes.label}>Latency</span></Badge>
          <CardBody className={classes.cardBody}>
            <span className={classes.metric}>{latency && (latency / 1000).toPrecision(4) + "s"}</span>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem md={6}>
        <Card className={classes.card} md={2}>
          <Badge color="white"><span className={classes.label}>Buffer Size</span></Badge>
          <CardBody className={classes.cardBody}>
            <span className={classes.metric}>{bufferTime && bufferTime.toPrecision(4) + 's'}</span>
          </CardBody>
        </Card>
      </GridItem>
      {!isIos &&
        <GridItem md={6}>
          <Card className={classes.card} md={2}>
            <Badge color="white"><span className={classes.label}>Bandwidth (Kbps)</span></Badge>
            <CardBody className={classes.cardBody}>
              <span className={classes.metric}>{stats.estimatedBandwidth ? (stats.estimatedBandwidth / 1024).toPrecision(4) + '' : 'estimating'}</span>
            </CardBody>
          </Card>
        </GridItem>
      }
      {!isIos &&
        <GridItem md={6}>
          <Card className={classes.card}>
            <Badge color="white"><span className={classes.label}>Quality</span></Badge>
            <CardBody className={classes.cardBody}>
              <span className={classes.metric}>{stats.height ? stats.height + 'p' : 'loading'}</span>
            </CardBody>
          </Card>
        </GridItem>
      }
      <GridItem md={6}>
        <Card className={classes.card}>
          <Badge color="white"><span className={classes.label}>Streamed From</span></Badge>
          <CardBody className={classes.cardBody}>
            <span className={classes.metric}>{location}</span>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem md={6}>
        <Card className={classes.card}>
          <Badge color="white"><span className={classes.label}>Playhead Time</span></Badge>
          <CardBody className={classes.cardBody}>
            <span className={classes.metric}>{playHeadTime.toISOString().slice(11, 19)}</span>
          </CardBody>
        </Card>
      </GridItem>
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
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={8} className={playerClasses} >

                  <ShakaPlayer
                    src={src}
                    posterUrl=""
                    stats={stats}
                    raised
                    onStatsUpdate={onStatsUpdate}
                    onBufferedInfoUpdate={onBufferedInfoUpdate}
                    onPlayHeadTimeUpdate={onPlayHeadTimeUpdate}
                  />
                  <Card className={classes.utcTimeBox} md={2}>
                    <Badge color="white" className={classes.utcTimeLabel}>UTC Time:</Badge>
                    <CardBody className={classes.cardBody}>
                      <span className={classes.localTime}>{currentTime}</span>
                    </CardBody>
                  </Card>
                  <Card className={classes.utcTimeBox} md={2}>
                    <CardBody className={classes.cardBody}>
                      <Line ref={chartRef} options={chartOptions} data={chartData} />
                    </CardBody>
                  </Card>
                  <Card className={classes.utcTimeBox} md={2}>
                    <CardBody className={classes.cardBody}>
                      <div className={classes.statsContainer}>
                        <span className={classes.statsItem}><b>Decoded frames:</b> {stats.decodedFrames}<br /></span>
                        <span className={classes.statsItem}><b>Dropped frames:</b> {stats.droppedFrames}<br /></span>
                        <span className={classes.statsItem}><b>Stalls detected:</b> {stats.stallsDetected}<br /></span>
                        <span className={classes.statsItem}><b>Gaps jumped:</b> {stats.gapsJumped}<br /></span>
{/*                      <span className={classes.statsItem}><b>PlayTime:</b>{stats.playTime}<br /></span>
                        <span className={classes.statsItem}><b>Bufering time:</b>{stats.bufferingTime}<br /></span>
                        <span className={classes.statsItem}><b>Max segment duration:</b>{stats.maxSegmentDuration}<br /></span>
                        <span className={classes.statsItem}><b>Switches:</b>{JSON.stringify(stats.switchHistory)}<br /></span> */}
                      </div>
                    </CardBody>
                  </Card>

                  <Hidden smUp>
                    {metricGrid}
                  </Hidden>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <Hidden xsDown >
                    {metricGrid}
                  </Hidden>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>

        </div>

        <FreeSection />
        <Footer whiteFont logoColor="gray" />
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