export interface liveStream {
    id: string,
    name: string,
    location: string,
    status: string,
    createdAt: Date,
    lastModified: Date,
    account: string,
    tags: {
        [propertyName: string]: string | undefined;
    }

}