export interface BlogCard {
        _id?: string
        text: string;
        title: string;
        date: Date;
        likes: number;
        likedBy: string[];
}