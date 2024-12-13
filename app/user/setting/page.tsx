
import AccountSettingForm from '@/components/Dashboard/AccountSetting';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { getUserByEmail } from '@/data/user';
import HeaderBar from '@/components/common/HeaderBar';

const AccountSetting = async () => {
	const session = await auth();
	if (!session || !session.user?.email) {
		redirect('/auth/login');
	}
	const user = await getUserByEmail(session.user.email);
	if (!user) {
		console.error('User not found in the database');
		redirect('/auth/login');
	}

	return (
	<div>
	<HeaderBar
        title="Want NifaWow Updates? No Spam."
        showReadMore={true}
        showSubscribe={false}
      />
	<AccountSettingForm user={{ userId: user.id, ...user }} />;
	</div>
	)

};

export default AccountSetting;
