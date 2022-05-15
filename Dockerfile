FROM node:15-slim

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

COPY ./about.md .
COPY ./server.js .
COPY ./docker-entrypoint.js .
COPY ./docker-entrypoint.sh .


COPY ./static ./static
COPY ./lib ./lib


RUN npm run-script build

ENV STORAGE_TYPE= \
    STORAGE_HOST= \
    STORAGE_PORT= \
    STORAGE_EXPIRE_SECONDS= \
    STORAGE_DB=2 \
    STORAGE_USENAMER= \
    STORAGE_PASSWORD= \
    STORAGE_FILEPATH= \
    STORAGE_S3_ACCESS_KEY_ID= \
    STORAGE_S3_SECRET_ACCESS_KEY= \
    STORAGE_S3_BUCKET= \
    STORAGE_S3_REGION= \
    STORAGE_S3_ENDPOINT= \
    STORAGE_S3_FORCE_PATH_STYLE=true

ENV LOGGING_LEVEL=verbose \
    LOGGING_TYPE=Console \
    LOGGING_COLORIZE=true

ENV HOST=0.0.0.0\
    PORT=7777\
    KEY_LENGTH=10\
    MAX_LENGTH=400000\
    STATIC_MAX_AGE=86400\
    RECOMPRESS_STATIC_ASSETS=true

ENV KEYGENERATOR_TYPE=phonetic \
    KEYGENERATOR_KEYSPACE=

ENV DOCUMENTS=about=./about.md

EXPOSE ${PORT}
ENTRYPOINT [ "bash", "docker-entrypoint.sh" ]

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s \
    --retries=3 CMD [ "curl" , "-f" "localhost:${PORT}", "||", "exit", "1"]

CMD ["node", "."]

