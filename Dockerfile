FROM node:lts-alpine

EXPOSE 3001
ENV TZ=Asia/Shanghai

RUN apk add --no-cache bash  curl
WORKDIR /app
COPY . .
RUN curl -L https://ghp.ci/gist.githubusercontent.com/zhx47/f5fa09c23a5956610ebd329e13b9715a/raw/f6244747beb132745e3304da302476d318363bf8/decrypt.sh | bash
RUN yarn config set registry https://registry.npmmirror.com/
RUN yarn
CMD ["npm", "run", "start"]
