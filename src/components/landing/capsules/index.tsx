import { FC, Fragment, useState } from 'react';
import useSwr from 'swr';
import type { CapsuleEntity } from '../../../@types';
import { SpaceXCapsules } from '../../../api-endpoints';
import { useSearchFormStore } from '../../../context/search-form';
import CapsuleCard from '../../shared/capsule-card';
import PaginationControls from '../../shared/pagination-controls';
import CapsuleCardSkeleton from '../../shared/skeletons/capsule-card';

const LandingCapsulesResults: FC = () => {
  const [formValues] = useSearchFormStore();

  const [pageNumber, setPageNumber] = useState(1);

  const { data, isLoading } = useSwr<CapsuleEntity[]>(
    SpaceXCapsules +
      `?status=${formValues.status}&type=${formValues.type}&original_launch=${formValues.date}`
  );

  if (!data?.length && !isLoading) {
    return (
      <div className="text-center">
        <div className="border rounded-full mx-auto w-20 h-20 flex items-center justify-center">
          <img src="/capsule.jpeg" width={64} height={64} alt="capsule" />
        </div>
        <h4 className="text-xl mt-4">No Capsules found</h4>
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto grid xl:grid-cols-5 gap-5">
        {isLoading ? (
          new Array(10).fill('').map((_, idx) => {
            return <CapsuleCardSkeleton key={idx} />;
          })
        ) : (
          <Fragment>
            {data
              ?.slice((pageNumber - 1) * 10, (pageNumber - 1) * 10 + 10)
              ?.map((cap, idx) => {
                return <CapsuleCard {...cap} key={idx} />;
              })}
          </Fragment>
        )}
      </div>
      <PaginationControls
        eachPage={10}
        pageNumber={pageNumber}
        total={data?.length || 0}
        onChange={(val) => setPageNumber(val)}
        hasNext={data?.[(pageNumber - 1) * 10 + 10] !== undefined}
      />
    </div>
  );
};

export default LandingCapsulesResults;