import { useLoaderData } from "react-router-dom";
import PageWrapper from "../../shared/components/ui/PageWrapper";
import ImageGridGallery from "../components/post-creation/ImageGridGallery";
import LocationCard from "../components/LocationCard";
import DescriptionCard from "../components/DescriptionCard";
import PostedByCard from "../components/PostedByCard";
import OptionsBar from "../components/OptionsBar";

import TagDisplay from "../../shared/components/ui/TagDisplay";

const Post = () => {
    const post = useLoaderData(); // Ensure this is correctly fetching the post data

    if (!post) {
        return <p>Loading...</p>; // Handle loading state or error
    }

    return (
        <PageWrapper>
            <div>
                {/* Title and Posting Details */}
                <div className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">
                        {post.title}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Posted on:{" "}
                        {new Date(post.postDate).toLocaleDateString()} |
                        Location: {post.location.address}, {post.country} |
                        Visited on:{" "}
                        {new Date(post.visitDate).toLocaleDateString()}
                    </p>
                    <div className="pt-4 md:mt-0">
                        <TagDisplay tags={post.tags}></TagDisplay>
                    </div>
                </div>

                {/* Image Gallery */}
                <ImageGridGallery images={post.images} />

                {/* Additional Information */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/2 space-y-4">
                        <PostedByCard
                            user={post.creator}
                            taggedPeople={post.taggedUsers}
                        />
                        <DescriptionCard description={post.description} />
                    </div>

                    {/* Map Section */}
                    <div className="w-full md:w-1/2">
                        <LocationCard location={post.location} />
                    </div>
                </div>

                <OptionsBar />
            </div>
        </PageWrapper>
    );
};

export default Post;
