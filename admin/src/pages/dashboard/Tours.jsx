import React from "react";
import { Typography } from "@material-tailwind/react";
import { ClockIcon } from "@heroicons/react/24/outline";
import { ToursCard } from "@/components/widgets/cards";
import { statisticsChartsData } from "@/data";

import { Avatar, Tabs, TabsHeader, Tab } from "@material-tailwind/react";

import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";

export function Tours() {
  return (
    <div className="mt-12">
      <div className="mb-10 flex items-center justify-between gap-6">
        <div className="w-96">
          <Tabs value="app">
            <TabsHeader>
              <Tab value="culture">Cultural</Tab>
              <Tab value="adventure">Adventure</Tab>
              <Tab value="beach">Beach</Tab>
              <Tab value="camping">Camping</Tab>
            </TabsHeader>
          </Tabs>
        </div>
        <div className="mr-5 flex items-center">
          <Button className="bg-blue-700">ADD NEW TOUR</Button>
        </div>
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <ToursCard
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Tours;
