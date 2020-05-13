FROM bambutz/ragemp

ADD sMailer.js /tmp/config/
ADD sMysql.js /tmp/config/

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - && \
    apt install -y git nodejs && \
    git clone https://github.com/MarkCavalli/rageserver /tmp/rageserver/ && \
    mv --force /tmp/rageserver/* /serverfiles/ && \
    mv --force /tmp/config/*.js /serverfiles/app/server/ && \
    rm -rf /tmp/rageserver/ && \
    cd /serverfiles/ && \
    npm i && \
    npm run build
