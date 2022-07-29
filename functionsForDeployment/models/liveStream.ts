export interface liveStream {
    id: string,
    name: string,
    location: string,
    status: string,
    createdAt: Date,
    lastModified: Date,
    protocol: string,
    streamKey: string,
    latencyMode: string,
    ingestUrl: string,
    account: string,
    tags : {
        [propertyName: string]: string;
    }
    
}