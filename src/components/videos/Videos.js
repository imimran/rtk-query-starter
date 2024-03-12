import { useGetVideosQuery } from "../../features/api/apiSlice";
import Video from "./Video";
import VideoLoader from '../ui/loaders/VideoLoader'
import Error from '../ui/Error'

export default function Videos() {
    const { data, isLoading, isError, } = useGetVideosQuery()

    let content = null
    if (isLoading) {
        content = (
            <>
                < VideoLoader />
                < VideoLoader />
                < VideoLoader />
                < VideoLoader />
                < VideoLoader />
                < VideoLoader />
                < VideoLoader />
                < VideoLoader />
            </>
        )
    }

    if (!isLoading && isError) {
        content = <Error />
    }

    if (!isLoading && !isError && data?.length > 0) {
        content = data.map(video => <Video key={video.id} video={video} />)
    }
    return content
}
