import { useState, useEffect } from "react"
import { type Video } from '@prisma/client'
import useIntersectionObserver from "@/useIntersectionObserver"

export default function FetchExample() {
    const [videos, setVideos] = useState<Video[]>([])
    const [loading, setLoading] = useState(false)
    const [hasNextPage, setHasNextPage] = useState(true)

    const fetchVideos = async (skip=0, limit=2) => {
        setLoading(true)
        const response = await fetch(`/api/feed?skip=${skip}&limit=${limit}`)
        const data = await response.json()
        console.log(data.total)
        if (data.total < limit) setHasNextPage(false)
        setLoading(false)
        return data.videos
    }

    useEffect(() => {
        void fetchVideos().then(setVideos)
    }, [])

    // using intersection observer custom hook
    const lastVideoRef = useIntersectionObserver<HTMLLIElement>(() => {
        void fetchVideos(videos.length).then(newVideos => 
            setVideos((prev) => [...prev, ...newVideos])
        )
    }, [hasNextPage, !loading])

    return (
        <div>
            <ul>
                {videos.map((video, i, videos) => (
                    <li key={video.thumbnail_id} ref={videos.length -1 === i ? lastVideoRef : null }>
                        <p>ID: {video.id}</p>
                    </li>
                ))}
            </ul>
            {loading && <p>Loading...</p>}
        </div>
    )


}
