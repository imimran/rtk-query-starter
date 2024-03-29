import { useParams } from "react-router-dom";
import { useGetVideoQuery } from "../../features/api/apiSlice";
import Description from "../video/Description";
import Player from "../video/Player";
import RelatedVideos from "../video/related/RelatedVideos";
import PlayerLoader from "../ui/loaders/PlayerLoader"
import DescriptionLoader from "../ui/loaders/DescriptionLoader"
import RelatedVideoLoader from "../ui/loaders/RelatedVideoLoader"
import Error from "../ui/Error"

export default function Video() {
    const { videoId } = useParams()
    const { data, isError, isLoading } = useGetVideoQuery(videoId)

    let content = null
    if (isLoading) {
        content = <>
            <PlayerLoader />
            <DescriptionLoader />
        </>
    }
    if (!isLoading && isError) {
        content =
            <Error message="There is an error!" />

    }
    if (!isLoading && !isError && data?.id) {
        content =
            (<>
                <Player title={data.title} link={data.link} />
                <Description video={data} />
                </>)
    }

    return (
        <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
            <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
                <div className="grid grid-cols-3 gap-2 lg:gap-8">
                    <div className="col-span-full w-full space-y-8 lg:col-span-2">
                        {content}
                    </div>

                    {data?.id ? <RelatedVideos id={data.id} title={data.title} /> : <RelatedVideoLoader /> }
                </div>
            </div>
        </section>
    );
}
