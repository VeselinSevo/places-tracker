import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import OptionsBar from "./OptionsBar";
import Map from "../../shared/components/Ui/Map";
import Avatar from "../../shared/components/Ui/Avatar";
import Card from "../../shared/components/Ui/Card";
import Carousel from "../../shared/components/Ui/Carousel";
import Button from "../../shared/components/Ui/Button";
import Modal from "../../shared/components/Ui/Modal";
import { Link } from "react-router-dom";

export default function PlaceItem({ place }) {
    const postDate = new Date(place.postDate);
    const isRecent = Date.now() - postDate.getTime() < 24 * 60 * 60 * 1000;

    const displayDate = isRecent
        ? `${formatDistanceToNow(postDate, { addSuffix: true })}`
        : `${postDate.toLocaleDateString()}`;

    const [isModalOpen, setisModalOpen] = useState(false);

    function closeModal() {
        setisModalOpen(false);
    }

    function openModal() {
        setisModalOpen(true);
    }

    return (
        <>
            {isModalOpen && (
                <Modal disableHover onClose={closeModal} showCloseIcon>
                    <h2 className="mb-3 text-xl font-bold tracking-tight">
                        {place.location.address}
                    </h2>
                    <Map location={place.location} height="300px" />
                </Modal>
            )}

            <Card customClasses="max-w-md md:max-w-xl rounded-lg" disableHover>
                <Carousel images={place.images} />
                <div className="flex flex-col overflow-hidden w-full md:flex-row">
                    <div className="flex flex-col p-4 leading-normal w-full md:w-2/3">
                        <div className="flex items-center mb-4 gap-4">
                            <Avatar
                                src={place?.creator?.profilePicture}
                                alt={place?.creator?.username || "Default User"}
                            />

                            <div>
                                <p className="text-text dark:text-text-dark font-bold">
                                    {place.creator.username}
                                </p>
                                <p className="text-text dark:text-text-dark text-sm">
                                    Posted: {displayDate}
                                </p>
                            </div>
                        </div>
                        <Link to={"/place/" + place.id}>
                            <h3 className="mb-1 text-2xl font-bold tracking-tight text-text dark:text-text-dark cursor-pointer">
                                {place.title}
                            </h3>
                        </Link>
                        <p className="mb-3 text-sm">
                            {place.location.address} ,{" "}
                            {new Date(place.visitDate).toLocaleDateString()}
                            {/* , - {place.country}{" "}
                            <img
                                className="ml-2 h-4 w-6"
                                src={`https://flagcdn.com/${place.country
                                    .toLowerCase()
                                    .substring(0, 2)}.svg`}
                                alt={`${place.country} flag`}
                            /> */}
                        </p>
                        {/* <p className="mb-3 text-text dark:text-text-dark text-sm flex items-center">
                            {new Date(place.visitDate).toLocaleDateString()}
                        </p> */}
                        <p className="mb-3 font-normal text-text dark:text-text-dark">
                            {place.description}
                        </p>
                    </div>
                    <div className="hidden md:block w-full md:w-1/3 pt-2 md:py-4">
                        <Map location={place.location} height="220px" />
                    </div>
                    <div className="md:hidden block px-4">
                        <Button
                            variant="secondary"
                            customClasses={"w-1/3 text-sm"}
                            onClick={openModal}
                        >
                            See on the map
                        </Button>
                    </div>
                </div>
                <div className="px-2 md:px-2">
                    <OptionsBar></OptionsBar>
                </div>
            </Card>
        </>
    );
}
