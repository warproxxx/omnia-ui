import { Box, Card, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import useWindowDimensions from "src/hooks/useWindowDimensions";

interface StatCardsProps {
    exchangeAsset1: string;
    exchangeAsset2: string;
    exchangeStats: {
        name: string;
        value: string|number;
    }[];
}

const StatCards = ({ exchangeAsset1, exchangeAsset2, exchangeStats }: StatCardsProps) => {
    const { width } = useWindowDimensions();
    const [slidesPerView, setSlidesPerView] = useState(5);

    useEffect(() => {
        if (width < 500) {
            setSlidesPerView(2);
        } else if (width < 768) {
            setSlidesPerView(3);
        } else if (width < 1024) {
            setSlidesPerView(4);
        } else {
            setSlidesPerView(5);
        }
    }, [width]);
    return (
        <Box
            sx={{
                gap: 0.5,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Typography
                variant="h3"
                sx={{
                    color: "text.secondary",
                }}
            >
                {exchangeAsset1} to {exchangeAsset2} stats
            </Typography>
            <Box>
                <Swiper
                    spaceBetween={10}
                    slidesPerView={slidesPerView}
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    scrollbar={{ draggable: true }}
                >
                    {exchangeStats.map((stat) => (
                        <SwiperSlide key={stat.name}>
                            <Box
                                sx={{
                                    height: "100%",
                                    ".MuiPaper-root": {
                                        height: "100%",
                                    },
                                }}
                            >
                                <Card>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            py: 1,
                                            pl: 1,
                                            pr: 0.5,
                                            gap: 0.5,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: "text.secondary",
                                            }}
                                        >
                                            {stat.name}
                                        </Typography>
                                        <Typography>{stat.value}</Typography>
                                    </Box>
                                </Card>
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </Box>
    );
};

export default StatCards;
