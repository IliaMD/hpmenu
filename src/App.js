import React, { Suspense, useEffect, useState, useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader, Boxes, Ground, Navbar, Hero } from "./components";
import Hamburger from "hamburger-react";
import {
  Button,
  Box,
  Typography,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  AppBar,
} from "@mui/material";
import "./App.css";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { useMediaQuery } from "@mui/material";
import * as THREE from "three";
import { Parallax, Background } from "react-parallax";
import { styled } from "@mui/system";
import {
  nonAlcohol,
  wine,
  whiskey,
  alco,
  cocktails,
  navs,
} from "./assets/mock/menu";
import bg from "./assets/brick_bg.jpg";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const Title = styled("span")(({ theme }) => ({
  fontWeight: "bold",
  letterSpacing: "3px",
  fontSize: "22px",
  [theme.breakpoints.up("md")]: {
    fontSize: "32px",
  },
  textTransform: "uppercase",
  display: "block",
  width: "100%",
  textAlign: "center",
  marginTop: "10px",
  marginBottom: "2px",
}));

const PositionBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const PositionDesc = styled("span")(({ theme }) => ({
  fontSize: "16px",
  [theme.breakpoints.up("md")]: {
    fontSize: "26px",
  },
  textAlign: "center",
}));

const PositionName = styled("span")(({ theme }) => ({
  fontSize: "20px",
  [theme.breakpoints.up("md")]: {
    fontSize: "30px",
  },
  textAlign: "center",
}));

const PositionPrice = styled("span")(({ theme }) => ({
  fontSize: "20px",
  [theme.breakpoints.up("md")]: {
    fontSize: "30px",
  },
  textAlign: "center",
}));

function LoadScreen() {
  const isDesktop = useMediaQuery("(min-width:600px)");
  const [count, setCount] = useState(0);
  const [intensity, setIntensity] = useState(0.5);

  useEffect(() => {
    let timerId;
    let intervalId;

    const updateCount = () => {
      setCount((prevCount) => prevCount + 1);
    };

    const updateIntensity = () => {
      const sinValue = Math.sin(Date.now() * 0.01);
      const newIntensity = THREE.MathUtils.clamp(sinValue, 0, 1);
      setIntensity(newIntensity);
    };

    if (count <= 4) {
      timerId = setInterval(updateCount, 1000);
      intervalId = setInterval(updateIntensity, 50);
    }

    return () => {
      clearInterval(timerId);
      clearInterval(intervalId);
    };
  }, [count]);

  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />

      <PerspectiveCamera
        makeDefault
        fov={50}
        position={isDesktop ? [0, 12, 3] : [0, 14, 14]}
      />

      <color args={[0, 0, 0]} attach="background" />

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
          </>
        )}
      </CubeCamera>

      {count >= 1 && (
        <spotLight
          color={new THREE.Color("#ffffff")}
          intensity={count > 2 ? 0.6 : intensity}
          angle={0.6}
          penumbra={0.5}
          position={[-20, 15, -15]}
          castShadow
          shadow-bias={-0.0001}
        />
      )}

      {count > 1 && (
        <spotLight
          color={new THREE.Color("#ffffff")}
          intensity={count > 2 ? 0.6 : intensity}
          angle={0.6}
          penumbra={0.5}
          position={[20, 15, -15]}
          castShadow
          shadow-bias={-0.0001}
        />
      )}

      <Ground />
    </>
  );
}

function App() {
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [isMoved, setIsMoved] = useState(false);
  const isDesktop = useMediaQuery("(min-width:600px)");
  const [isOpen, setOpen] = useState(false);

  const handleOpenMenu = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingPercent((prevPercent) => {
        if (prevPercent >= 98) {
          clearInterval(intervalId);
        }
        return prevPercent + 1;
      });
    }, 40);
  }, []);

  const handleMove = () => {
    setIsMoved(true);
  };

  const styles = {
    height: "1000vh",
    width: isDesktop ? "400vw" : "200vw",
    backgroundImage: isDesktop ? "url('/bg2.jpg')" : "url('/bg5.png')",
    backgroundSize: !isDesktop ? "700px" : "auto",
  };

  const navsRef = useRef([]);

  const handleScroll = (name) => {
    console.log(name);
    const element = document.getElementById(`#${name}`);
    console.log(element);
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }

    setOpen(false);
  };
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("Page scroll: ", latest);
  });

  const hookahRef = useRef(null);
  const teaRef = useRef(null);
  const lemonadeRef = useRef(null);
  const wineRef = useRef(null);
  const whiskeyRef = useRef(null);
  const alcoRef = useRef(null);
  const cocktailsRef = useRef(null);

  useEffect(() => {
    console.log(wineRef.current?.offsetTop);
  }, [wineRef.current]);
  
  return (
    <>
      {!isMoved ? (
        <Suspense fallback={null}>
          <Canvas shadows>
            <LoadScreen />
          </Canvas>

          <Button
            variant="contained"
            sx={{
              position: "absolute",
              top: "85%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#e3000e",
              fontSize: " 30px",
              letterSpacing: "3px",
              width: "150px",
              height: "60px",
              fontFamily: "PoiretOne",
              "&:hover": {
                background: "#e3000e",
              },
            }}
            onClick={handleMove}
          >
            Меню
          </Button>
        </Suspense>
      ) : (
        <div style={{ position: "relative" }}>
          <AppBar
            sticky
            sx={{
              backgroundColor: "black",
              height: "80px",
              boxShadow: "0px 14px 11px 5px rgba(0, 0, 0, 0.5)",
              d: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              pl: 2,
              pr: 6,
            }}
          >
            <Box sx={{}}>
              <Hamburger
                direction="right"
                size={32}
                toggled={isOpen}
                toggle={setOpen}
                onClick={handleOpenMenu}
                color={"white"}
              />
            </Box>

            <Box sx={{ flex: 1, textAlign: "center" }}>
              <img
                src={"/textures/logo.png"}
                style={{ height: "80px", width: "80px" }}
              />
            </Box>
          </AppBar>

          <Box
            sx={{
              display: isOpen ? "flex" : "none",
              height: "1000vh",
              overflow: isOpen ? "hidden" : "auto",
              width: "100vw",
              backgroundColor: "black",
              color: "white",
              flexDirection: "column",
              position: "absolute",
              top: 0,
              left: 0,
              pt: "100px",
              zIndex: 1000,
            }}
          >
            {navs.map((name, i) => (
              <Title
                key={i}
                ref={navsRef.current[i]}
                sx={{ py: 2, fontSize: "30px", cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll(name);
                }}
              >
                {name}
              </Title>
            ))}
          </Box>

          <Parallax strength={isDesktop ? 5000 : 3000}>
            <motion.div>
              <Box
                sx={{
                  color: "white",
                  fontFamily: "PoiretOne",
                  p: 4,
                  pt: 12,
                  px: { md: 24 },
                }}
              >
                {nonAlcohol.map((elem, index) => (
                  <>
                    <Title id={`#${elem.title}`}>{elem.title}</Title>
                    {elem.position.map((position) => (
                      <PositionBox>
                        <PositionName sx={{ textAlign: "left" }}>
                          {position.name}
                        </PositionName>
                        <PositionPrice>{position.price}</PositionPrice>
                      </PositionBox>
                    ))}
                  </>
                ))}
                <Grid container ref={wineRef}>
                  <Title id="#Вино">Вино</Title>
                  {wine.map((elem, index) => (
                    <Grid item xs={index === 2 ? 12 : 6}>
                      <Title>{elem.title}</Title>
                      {elem.position.map((position) => (
                        <PositionBox sx={{ flexDirection: "column", py: 2 }}>
                          <PositionName>{position.name}</PositionName>
                          <PositionDesc>{position.desc}</PositionDesc>
                          <PositionPrice>{position.price}</PositionPrice>
                        </PositionBox>
                      ))}
                    </Grid>
                  ))}
                </Grid>

                {whiskey.map((elem) => (
                  <>
                    <Title id="#Виски">{elem.title}</Title>
                    {elem.position.map((position) => (
                      <PositionBox sx={{ flexDirection: "column", py: 2 }}>
                        <PositionName>{position.name}</PositionName>
                        <PositionPrice>{position.desc}</PositionPrice>
                        <PositionPrice>{position.price}</PositionPrice>
                      </PositionBox>
                    ))}
                  </>
                ))}

                <ImageList
                  variant="quilted"
                  cols={2}
                  gap={14}
                  id="#Крепкие напитки"
                >
                  {alco.map((elem, index) => (
                    <ImageListItem cols={1} rows={index === 0 ? 2 : 1}>
                      <Title>{elem.title}</Title>
                      {elem.position.map((position) => (
                        <PositionBox sx={{ py: "4px" }}>
                          <PositionName
                            sx={{ textAlign: "left", fontSize: "18px" }}
                          >
                            {position.name}
                          </PositionName>
                          <PositionPrice sx={{ fontSize: "18px" }}>
                            {position.price}
                          </PositionPrice>
                        </PositionBox>
                      ))}
                    </ImageListItem>
                  ))}
                </ImageList>

                {cocktails.map((elem) => (
                  <>
                    <Title sx={{ mt: 4, mb: 1 }} id="#Алкогольные коктейли">
                      {elem.title}
                    </Title>
                    {elem.position.map((position) => (
                      <PositionBox sx={{ flexDirection: "column", py: 1 }}>
                        <PositionName>{position.name}</PositionName>
                        <PositionPrice sx={{ fontSize: "16px" }}>
                          {position.desc}
                        </PositionPrice>
                        <PositionPrice>{position.price}</PositionPrice>
                      </PositionBox>
                    ))}
                  </>
                ))}
              </Box>
            </motion.div>
            <Background style={{ width: "100%", height: "100%" }}>
              <div style={styles}></div>
            </Background>
          </Parallax>
        </div>
      )}
    </>
  );
}

export default App;
