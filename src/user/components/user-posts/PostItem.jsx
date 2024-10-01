/* eslint-disable react/prop-types */

import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import Card from "../../../shared/components/ui/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../shared/components/ui/Modal";
import OptionsModal from "../../../shared/components/ui/OptionsModal";
import Button from "../../../shared/components/ui/Button";
import { Link } from "react-router-dom";
import axiosInstance from "../../../../axiosInstance";
import useLoading from "../../../shared/hooks/useLoading";
import CornerPopup from "../../../shared/components/ui/CornerPopup";

export default function PostItem({ post, isOwner, onPostDelete }) {
    const [popup, setPopup] = useState(null);
    const [deleteRequest, loading] = useLoading(async (postId) => {
        const response = await axiosInstance.delete(`/posts/${postId}`);
        return response;
    });
    const [showMenu, setShowMenu] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const postDate = new Date(post.createdAt);
    const isRecent = Date.now() - postDate.getTime() < 24 * 60 * 60 * 1000;

    const displayDate = isRecent
        ? `${formatDistanceToNow(postDate, { addSuffix: true })}`
        : `${postDate.toLocaleDateString()}`;

    const handleEdit = () => {
        console.log("Edit post:", post.id);
        setShowMenu(false);
    };

    const handleDelete = () => {
        setShowMenu(false);
        setShowDeleteConfirmation(true);
    };

    const confirmDelete = async () => {
        console.log("Deleting post:", post.id);
        try {
            await deleteRequest(post.id);
            setPopup({ type: "success", message: "Post deleted successfully" });

            // Notify parent that post has been deleted
            if (onPostDelete) {
                onPostDelete(post.id);
            }
        } catch (error) {
            console.log("Delete error:", error.response);
            const errorMsg = error.response?.data.message || "Delete failed";
            setPopup({ type: "error", message: errorMsg });
        }
        setShowDeleteConfirmation(false);
    };

    const handleHide = () => {
        console.log("Hide post:", post.id);
        setShowMenu(false);
    };

    const OPTIONS = [
        { text: "Edit", onClick: handleEdit },
        { text: "Hide", onClick: handleHide },
        { text: "Delete", onClick: handleDelete, style: "danger" },
        { text: "Cancel", onClick: () => setShowMenu(false) },
    ];

    return (
        <>
            <Card customClasses="rounded-sm md:rounded-md relative">
                <div>
                    <Link to={`/post/${post.id}`}>
                        <img
                            className="object-cover w-full rounded-sm md:rounded-md"
                            src={post.images[0]}
                            alt={post.title}
                            style={{ height: "200px" }} // Fixed height for the image
                        />

                        {isOwner && (
                            <div className="absolute top-1 right-1 block md:hidden">
                                <button
                                    onClick={() => setShowMenu(!showMenu)}
                                    className="bg-bg dark:bg-bg-dark p-1 rounded text-text dark:text-text-dark hover:text-primary dark:hover:text-primary"
                                >
                                    <FontAwesomeIcon icon={faEllipsisV} />
                                </button>
                            </div>
                        )}
                    </Link>
                </div>

                <div className="md:flex flex-col !rounded-none !md:rounded-lg flex-grow p-4 w-full justify-between hidden">
                    <div className="flex justify-between items-start">
                        <Link to={`/post/${post.id}`}>
                            <h5 className="mb-1 text-xl font-bold tracking-tight text-text dark:text-text-dark">
                                {post.title}
                            </h5>
                        </Link>
                        {isOwner && (
                            <div className="relative">
                                <button
                                    onClick={() => setShowMenu(!showMenu)}
                                    className="text-text dark:text-text-dark hover:text-primary dark:hover:text-primary"
                                >
                                    <FontAwesomeIcon icon={faEllipsisV} />
                                </button>
                            </div>
                        )}
                    </div>
                    <p className="mb-2 text-text dark:text-text-dark text-sm flex items-center">
                        {post.location.country}

                        {/* <img
                            className="ml-2 h-4 w-6"
                            src={`https://flagcdn.com/${post.location.country
                                .toLowerCase()
                                .substring(0, 2)}.svg`}
                            alt={`${post.location.country} flag`}
                        /> */}
                    </p>
                    <p className="text-text dark:text-text-dark text-sm flex items-center">
                        Posted: {displayDate}
                    </p>
                </div>
            </Card>
            {showMenu && (
                <OptionsModal
                    options={OPTIONS}
                    onClose={() => setShowMenu(false)}
                />
            )}
            {showDeleteConfirmation && (
                <Modal
                    onClose={() => setShowDeleteConfirmation(false)}
                    disableHover
                >
                    <p>
                        Are you sure you want to delete this post? This action
                        cannot be undone.
                    </p>
                    <div className="flex justify-end space-x-2">
                        <Button
                            onButtonClick={() =>
                                setShowDeleteConfirmation(false)
                            }
                            variant="secondary"
                        >
                            Cancel
                        </Button>
                        <Button
                            onButtonClick={confirmDelete}
                            variant="danger"
                            loading={loading}
                        >
                            Delete
                        </Button>
                    </div>
                </Modal>
            )}
            {popup && (
                <CornerPopup
                    message={popup.message}
                    type={popup.type}
                    onClose={() => setPopup(null)}
                />
            )}
        </>
    );
}
