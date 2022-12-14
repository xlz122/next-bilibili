import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { formatTenThousand } from '@utils/utils';
import styles from './group.module.scss';

type Props = {
  list: ListItemType[];
};

export type ListItemType = {
  module_info: {
    title: string;
  };
  list: ItemType[];
};

type ItemType = {
  roomid: number;
  title: string;
  cover: string;
  uname: string;
  watched_show: {
    num: number;
  };
};

function LiveGroup(props: Props): React.ReactElement {
  const router = useRouter();

  // 跳转直播详情
  const jumpLiveDetail = (item: ItemType): void => {
    router.push({
      pathname: '/live-room',
      query: { roomid: item.roomid }
    });
  };

  const RenderItem = ({ item }: { item: ListItemType }) => (
    <li className={styles.panel}>
      <div className={styles.title}>
        <div className={styles.titleText}>{item.module_info.title}</div>
        <div className={styles.more}>
          <div className={styles.moreText}>进来看看</div>
          <Image
            className={styles.moreIcon}
            width={16}
            height={16}
            src={'/images/live/live-right-arrow.png'}
            alt=""
          />
        </div>
      </div>
      <div className={styles.list}>
        {item.list.map((i, index) => {
          return (
            <div
              className={styles.item}
              key={index}
              onClick={() => jumpLiveDetail(i)}
            >
              <div className={styles.itemCover}>
                <Image
                  className={styles.itemImage}
                  src={i?.cover || ''}
                  fill
                  sizes="50%"
                  priority
                  alt=""
                />
                <div className={styles.info}>
                  <div className={styles.infoName}>
                    <span className={styles.nameText}>{i.uname}</span>
                  </div>
                  <div className={styles.infoCount}>
                    <Image
                      width={8}
                      height={8}
                      src={'/images/live/live-eye.png'}
                      alt=""
                    />
                    <span className={styles.countText}>
                      {formatTenThousand(i?.watched_show?.num)}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.itemTitle}>{i.title}</div>
            </div>
          );
        })}
      </div>
    </li>
  );

  return (
    <ul className={styles.liveGroup}>
      {props?.list?.map((item, index) => {
        // 第一项不展示
        if (index === 0) {
          return null;
        }

        return <RenderItem key={index} item={item} />;
      })}
    </ul>
  );
}

export default LiveGroup;
