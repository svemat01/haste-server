const {
    HOST,
    PORT,
    KEY_LENGTH,
    MAX_LENGTH,
    STATIC_MAX_AGE,
    RECOMPRESS_STATIC_ASSETS,

    STORAGE_TYPE,
    STORAGE_HOST,
    STORAGE_PORT,
    STORAGE_EXPIRE_SECONDS,
    STORAGE_DB,
    STORAGE_PASSWORD,
    STORAGE_USERNAME,
    STORAGE_FILEPATH,

    STORAGE_S3_ACCESS_KEY_ID,
    STORAGE_S3_SECRET_ACCESS_KEY,
    STORAGE_S3_BUCKET,
    STORAGE_S3_REGION,
    STORAGE_S3_ENDPOINT,
    STORAGE_S3_FORCE_PATH_STYLE,

    LOGGING_LEVEL,
    LOGGING_TYPE,
    LOGGING_COLORIZE,
    KEYGENERATOR_TYPE,
    KEY_GENERATOR_KEYSPACE,
    DOCUMENTS,
} = process.env;

const config = {
    host: HOST,
    port: PORT,

    keyLength: KEY_LENGTH,

    maxLength: MAX_LENGTH,

    staticMaxAge: STATIC_MAX_AGE,

    recompressStaticAssets: RECOMPRESS_STATIC_ASSETS,

    logging: [
        {
            level: LOGGING_LEVEL,
            type: LOGGING_TYPE,
            colorize: LOGGING_COLORIZE,
        },
    ],

    keyGenerator: {
        type: KEYGENERATOR_TYPE,
        keyspace: KEY_GENERATOR_KEYSPACE,
    },

    storage: {
        type: STORAGE_TYPE,
        host: STORAGE_HOST,
        port: STORAGE_PORT,

        expire: STORAGE_EXPIRE_SECONDS,
        bucket: STORAGE_S3_BUCKET,
        clientOptions: {
            region: STORAGE_S3_REGION,
            credentials: {
                accessKeyId: STORAGE_S3_ACCESS_KEY_ID,
                secretAccessKey: STORAGE_S3_SECRET_ACCESS_KEY,
            },

            // For custom endpoint or S3 compatible storage 
            // like Minio, DigitalOcean Spaces, IBM Cloud Object Storage, Backblaze B2 cloud storage...
            endpoint: STORAGE_S3_ENDPOINT,
            // For Minio to work
            forcePathStyle: Boolean(STORAGE_S3_FORCE_PATH_STYLE),
        },
        
        connectionUrl: `postgres://${STORAGE_USERNAME}:${STORAGE_PASSWORD}@${STORAGE_HOST}:${STORAGE_PORT}/${STORAGE_DB}`,
        db: STORAGE_DB,
        user: STORAGE_USERNAME,
        password: STORAGE_PASSWORD,
        path: STORAGE_FILEPATH,
    },

    documents: DOCUMENTS
        ? DOCUMENTS.split(",").reduce((acc, item) => {
              const keyAndValueArray = item.replace(/\s/g, "").split("=");
              return { ...acc, [keyAndValueArray[0]]: keyAndValueArray[1] };
          }, {})
        : null,
};

console.log("module.exports = " + JSON.stringify(config));
