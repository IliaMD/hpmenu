import { Box, Typography } from "@mui/material";
import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import { VkIcon } from "../assets/svg";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";

export const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "black",
        display: "flex",
        px: { xs: 2, md: 22 },
        py: 2,
      }}
    >
      <Box sx={{ flex: 1, alignSelf: "center" }}>
        <a href="https://instagram.com/hpomsk">
          <InstagramIcon
            sx={{ color: "white", height: "35px", width: "35px", mr: 2 }}
          />
        </a>
        <a href="https://t.me/+VyMMi20TP96JOQGn">
          <TelegramIcon
            sx={{ color: "white", height: "35px", width: "35px", mr: 2 }}
          />
        </a>
        <a href="https://vk.com/ex_hpomsk">
          <VkIcon />
        </a>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", mb: 1 }}>
          <PlaceIcon sx={{ color: "white" }} />
          <Typography sx={{ color: "white", fontFamily: "PoiretOne", ml: 1 }}>
            <a href="https://2gis.ru/omsk/firm/70000001020515753">
              Партизанская 5А/8
            </a>
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <PhoneEnabledIcon sx={{ color: "white" }} />
          <Typography sx={{ color: "white", fontFamily: "PoiretOne", ml: 1 }}>
            <a href="tel:+73812381925">+7 (3812) 38-19-25</a>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
