import { Input } from '@/components';
import { useDebounce } from '@/hooks';
import { updateFilteredEvents } from '@/redux/eventsSlice';
import { updateSearchText } from '@/redux/filtersSlice';
import type { RootState } from '@/redux/store';
import { useEffect, useState, type ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Filter() {
  const [isMounted, setIsMounted] = useState(false);

  const dispatch = useDispatch();
  const { events } = useSelector((state: RootState) => state.events);
  const { searchText } = useSelector((state: RootState) => state.filters);

  const debouncedSearchText = useDebounce(searchText, 750);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);

      return;
    }

    const filteredItems = events
      .map((event) =>
        event.filter((e) => {
          const home = e.home_team?.toLowerCase() ?? '';
          const away = e.away_team?.toLowerCase() ?? '';
          return (
            home.includes(debouncedSearchText) ||
            away.includes(debouncedSearchText)
          );
        })
      )
      .filter((group) => group.length > 0);

    dispatch(updateFilteredEvents(filteredItems));
  }, [debouncedSearchText, events]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(updateSearchText(value));
  };

  return (
    <Input
      placeholder="Search"
      style={{ width: '100%' }}
      onChange={handleSearch}
      value={searchText}
    />
  );
}
