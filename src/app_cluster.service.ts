/**
 * File: app_cluster.service.ts
 * Description: cluster 多进程启动
 * Author: zhx47
 */

import * as os from 'os';
import { Cluster } from 'cluster';
import { Logger } from '@nestjs/common';
import * as clusterModule from 'cluster';
import * as process from 'node:process';
import { isNullOrUndefined } from './utils/baseUtils';

const cluster = clusterModule as unknown as Cluster;

const numCPUs = isNullOrUndefined(process.env.THREAD_NUM) ? os.cpus().length : Number(process.env.THREAD_NUM);

export class AppClusterService {
  private static readonly logger = new Logger(AppClusterService.name);

  static clusterize(callback: CallableFunction): void {
    if (cluster.isPrimary) {
      this.logger.log(`Master server started on ${process.pid}`);
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
      cluster.on('exit', (worker, _code, _signal) => {
        this.logger.warn(`Worker ${worker.process.pid} died. Restarting`);
        cluster.fork();
      });
    } else {
      this.logger.log(`Cluster server started on ${process.pid}`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      callback();
    }
  }
}
