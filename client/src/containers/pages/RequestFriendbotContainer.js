import { connect } from 'react-redux';
import RequestFriendbot from '@quanta/components/pages/RequestFriendbot';

const mapStateToProps = state => ({
	environmentType: state.header.environmentType,
});

export default connect(mapStateToProps)(RequestFriendbot);
