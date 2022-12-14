import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { liveIndex } from '@/api/live';
import type { ResponseType } from '@/types/index';
import type { BannerType } from '@/page-component/live/banner/Banner';
import type { ListItemType } from '@/page-component/live/group/Group';
import TabBar from '@/page-component/live/tab-bar/TabBar';
import LiveBanner from '@/page-component/live/banner/Banner';
import LiveGroup from '@/page-component/live/group/Group';
import styles from './live.module.scss';

type Props = {
  banner: BannerType;
  list: ListItemType[];
};

function Live(props: Props): React.ReactElement {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              width={60}
              height={27}
              src={'/images/logo-pink.png'}
              alt=""
            />
          </Link>
        </div>
      </div>
      <TabBar />
      <LiveBanner banner={props.banner} />
      <LiveGroup list={props.list} />
      <div className={styles.operate}>
        <div className={styles.operateItem}>
          <button className={styles.operateItemBtn}>全部直播</button>
        </div>
        <div className={styles.operateItem}>
          <button className={styles.operateItemBtn}>全部分类</button>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps(): Promise<{
  props: Props;
  revalidate: number;
}> {
  const res: ResponseType = await liveIndex({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
  });

  const props: Props = {
    banner: {},
    list: []
  };

  if (res?.code === 0) {
    props.banner = res?.data?.module_list[0] || {};
    props.list = res?.data?.module_list.slice(1) || [];
  }

  return {
    props,
    revalidate: 60
  };
}

Live.getLayout = function getLayout(page: React.ReactElement) {
  return page;
};

export default Live;
