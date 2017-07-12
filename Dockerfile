FROM node
MAINTAINER Boris Kolganov <b.kolganov@corp.mail.ru>
COPY . /opt/solution
WORKDIR /opt/solution
RUN apt-get update && apt-get install mongodb -y && systemctl enable mongodb && npm install && mkdir db
CMD bash run.sh