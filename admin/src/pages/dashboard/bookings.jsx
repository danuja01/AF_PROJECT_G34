import React from "react";
import { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
} from "@material-tailwind/react";
import { debounce } from "lodash";
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";

import {
  archiveBooking,
  deleteBooking,
  getAllBookings,
} from "../../services/booking";

export function Bookings() {
  const [bookingRes, setBookingRes] = useState("");

  const refresh = debounce(() => {
    getAllBookings().then(({ data }) => setBookingRes(data));
  }, 300);

  useEffect(() => {
    refresh();
  }, []);

  const [value, setValue] = useState(false);

  const handleChange = (val) => {
    setValue(val);
  };

  const handleArchive = (id) => {
    archiveBooking(id).then(() => refresh());
  };

  const handleDelete = (id) => {
    deleteBooking(id).then(() => refresh());
  };

  return (
    <div className="mt-6 mb-8 flex flex-col gap-12">
      <div className="w-[20rem]">
        <Tabs value={value ? value : "false"}>
          <TabsHeader>
            <Tab value="false" onClick={() => setValue(false)}>
              All
            </Tab>
            <Tab value="true" onClick={() => handleChange(true)}>
              Archived
            </Tab>
          </TabsHeader>
        </Tabs>
      </div>
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Booking Requests
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Name", "Tour", "status", "date", "budget", "", ""].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {bookingRes &&
                bookingRes
                  .filter((booking) => booking.archived === value)
                  .map(({ _id, name, email, tourId, date, status, budget }) => {
                    const className = `py-3 px-5`;
                    return (
                      <tr key={_id}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {name}
                              </Typography>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {tourId.tourName}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Chip
                            variant="gradient"
                            color={
                              status === "complete" ? "green" : "blue-gray"
                            }
                            value={status}
                            className="py-0.5 px-2 text-[11px] font-medium"
                          />
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {date.slice(0, 10)}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {budget > 0 ? budget : "-"}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            as="a"
                            href="#"
                            className="text-xs font-semibold text-blue-gray-600 hover:text-green-500"
                          >
                            mark as complete
                          </Typography>
                        </td>
                        <td className={className}>
                          <button
                            as="a"
                            href="#"
                            onClick={() => {
                              value ? handleDelete(_id) : handleArchive(_id);
                            }}
                            className=" text-xs font-semibold text-red-600 hover:underline"
                          >
                            {value ? "delete" : "archive"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Bookings;
