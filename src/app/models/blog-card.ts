export interface BlogCard {
        _id?: string;
        text: string;
        title: string;
        date: Date;
        likes: number;
        image: string;
        likedBy: string[];
        replies: string[];
        author: any;
        isLikeInProgress: boolean;
        isReplyInProgress: boolean;
}