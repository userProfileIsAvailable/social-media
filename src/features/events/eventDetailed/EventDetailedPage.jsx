import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleEvent } from '../EventSlice';
import LoadingComponent from '../../../app/layout/LoadingComponent';

export default function EventDetailedPage({ match }) {
	const {
		params: { id },
	} = match;

	const dispatch = useDispatch();
	const status = useSelector((state) => state.events.status);
	const events = useSelector((state) => state.events.events);
	const { current_user } = useSelector((state) => state.auth);

	const event = events.find((item) => item.id === id);

	const isHost = event?.hostUid === current_user?.uid;
	const isGoing = event?.attendees?.some((a) => a.id === current_user?.uid);
	React.useEffect(() => {
		dispatch(fetchSingleEvent({ id }));
	}, [dispatch, id]);

	let content;
	if (status === 'pending') {
		content = <LoadingComponent />;
	} else if (status === 'fulfilled') {
		content = (
			<Grid>
				<Grid.Column width={10}>
					<EventDetailedHeader
						id={id}
						event={event}
						isGoing={isGoing}
						isHost={isHost}
					/>
					<EventDetailedInfo event={event} />
					<EventDetailedChat />
				</Grid.Column>
				<Grid.Column width={6}>
					<EventDetailedSidebar event={event} hostUid={event.hostUid} />
				</Grid.Column>
			</Grid>
		);
	} else if (status === 'failed') {
		content = <div> something went wrong </div>;
	}
	return <div>{content}</div>;
}
