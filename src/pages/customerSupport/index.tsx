import Page from 'components/Page';
import HomeLayout from 'layouts/Home';
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import RouteLink from 'components/RouteLink';
import HomeIcon from '@mui/icons-material/Home';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import TermOfServiceMenuBar from 'components/TermOfService/MenuBar';
import { useEffect, useState } from 'react';
import type { SyntheticEvent } from 'react';
// import TabPanel from 'components/TabPanel';
import { withRouter } from 'next/router';
import type { NextRouter } from 'next/router';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import type { GetServerSideProps } from 'next';
import TermAndPolicy from 'services/term_and_policy';
import type { TermAndPolicyRespond } from 'types/termAndPolicy';
// import parse from 'html-react-parser';
import { Typography } from '@mui/material';

interface TermOfServiceProps {
  router: NextRouter;
  term: TermAndPolicyRespond | null;
  policy: TermAndPolicyRespond | null;
}

const CustomerSp = (props: TermOfServiceProps) => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<number>(0);
  const { router } = props;
  const { type } = router.query;
  const theme = useTheme();
  const mediaMinMd = useMediaQuery(theme.breakpoints.up('md'));
  const [breadcrumb, setBreadcrumb] = useState<string>('termOfService');

  useEffect(() => {
    if (type && typeof type === 'string' && type === '1') {
      setTab(1);
      setBreadcrumb('label.privatePolicy');
    } else {
      setTab(0);
      setBreadcrumb('label.customersp');
    }
  }, [type]);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTab(newValue);
    if (tab === 1) {
      setBreadcrumb('label.customersp');
    } else {
      setBreadcrumb('label.customersp');
    }
  };

  return (
    <HomeLayout>
      <Page title="Điều khoản dịch vụ">
        <Container
          sx={{
            mt: { xs: 7, sm: 10 },
            p: 2.25,
          }}
        >
          <Container>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
              <RouteLink
                href="/"
                sx={{ display: 'flex', alignItems: 'center' }}
                color={'primary.dark'}
              >
                <HomeIcon /> {t('label.home')}
              </RouteLink>
              <RouteLink
                href="/customerSupport"
                sx={{ display: 'flex', alignItems: 'center' }}
                color={'primary.dark'}
              >
                {t(breadcrumb)}
              </RouteLink>
            </Breadcrumbs>
          </Container>
          <Container
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              pl: 0,
              pr: 0,
              mt: 2,
            }}
          >
            {mediaMinMd && (
              <Container
                disableGutters
                maxWidth="s300"
                sx={{ order: { xs: 2, md: 1 } }}
              >
                <TermOfServiceMenuBar handleChange={handleChange} tab={tab} />
              </Container>
            )}

            <Container disableGutters sx={{ order: { xs: 1, md: 2 } }}>
              {/* <Box sx={{ backgroundColor: 'background.paper' }}>
                <TabPanel index={0} value={tab}>
                  {term ? parse(term.content) : ''}
                </TabPanel>
                <TabPanel index={1} value={tab}>
                  {policy ? parse(policy.content) : ''}
                </TabPanel>
              </Box> */}
              <Box sx={{ paddingLeft: '24px' }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 'bold', marginBottom: '16px' }}
                >
                  Điều Khoản dịch vụ
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  1. Giới thiệu
                </Typography>
                <Typography variant="subtitle1" sx={{ margin: '16px 0px' }}>
                  Chào mừng quý khách hàng đến với Japan Ship.
                </Typography>
                <Typography variant="subtitle1" sx={{ margin: '16px 0px' }}>
                  Chúng tôi là Công ty TNHH Ti Ki có địa chỉ trụ sở tại Tòa Nhà
                  Viettel, Số 285, Đường Cách Mạng Tháng 8, Phường 12, Quận 10,
                  TP Hồ Chí Minh, chủ sở hữu Sàn giao dịch thương mại điện tử
                  thông qua website <a href="http://">www.tiki.vn </a> và đã
                  được đăng ký chính thức với Bộ Công Thương.
                </Typography>
                <Typography variant="subtitle1" sx={{ margin: '16px 0px' }}>
                  Khi quý khách hàng truy cập vào trang website của chúng tôi có
                  nghĩa là quý khách đồng ý với các điều khoản này. Trang web có
                  quyền thay đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ phần nào
                  trong Điều khoản mua bán hàng hóa này, vào bất cứ lúc nào. Các
                  thay đổi có hiệu lực ngay khi được đăng trên trang web mà
                  không cần thông báo trước. Và khi quý khách tiếp tục sử dụng
                  trang web, sau khi các thay đổi về Điều khoản này được đăng
                  tải, có nghĩa là quý khách chấp nhận với những thay đổi đó.
                </Typography>
                <Typography variant="subtitle1" sx={{ margin: '16px 0px' }}>
                  Quý khách hàng vui lòng kiểm tra thường xuyên để cập nhật
                  những thay đổi của chúng tôi.
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  2. Hướng dẫn sử dụng website
                </Typography>
                <Typography variant="subtitle1" sx={{ margin: '16px 0px' }}>
                  Khi vào web của chúng tôi, khách hàng phải đảm bảo đủ 18 tuổi,
                  hoặc truy cập dưới sự giám sát của cha mẹ hay người giám hộ
                  hợp pháp. Khách hàng đảm bảo có đầy đủ hành vi dân sự để thực
                  hiện các giao dịch mua bán hàng hóa theo quy định hiện hành
                  của pháp luật Việt Nam.
                </Typography>

                <Typography variant="subtitle1" sx={{ margin: '16px 0px' }}>
                  Chúng tôi sẽ cấp một tài khoản (Account) sử dụng để khách hàng
                  có thể mua sắm trên website <a href="http://">Tiki.vn</a>{' '}
                  trong khuôn khổ Điều khoản và Điều kiện sử dụng đã đề ra.
                </Typography>

                <Typography variant="subtitle1" sx={{ margin: '16px 0px' }}>
                  Quý khách hàng sẽ phải đăng ký tài khoản với thông tin xác
                  thực về bản thân và phải cập nhật nếu có bất kỳ thay đổi nào.
                  Mỗi người truy cập phải có trách nhiệm với mật khẩu, tài khoản
                  và hoạt động của mình trên web. Hơn nữa, quý khách hàng phải
                  thông báo cho chúng tôi biết khi tài khoản bị truy cập trái
                  phép. Chúng tôi không chịu bất kỳ trách nhiệm nào, dù trực
                  tiếp hay gián tiếp, đối với những thiệt hại hoặc mất mát gây
                  ra do quý khách không tuân thủ quy định.
                </Typography>

                <Typography variant="subtitle1" sx={{ margin: '16px 0px' }}>
                  Nghiêm cấm sử dụng bất kỳ phần nào của trang web này với mục
                  đích thương mại hoặc nhân danh bất kỳ đối tác thứ ba nào nếu
                  không được chúng tôi cho phép bằng văn bản. Nếu vi phạm bất cứ
                  điều nào trong đây, chúng tôi sẽ hủy tài khoản của khách mà
                  không cần báo trước.
                </Typography>

                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  3. Ý kiến của khách hàng
                </Typography>

                <Typography variant="subtitle1" sx={{ margin: '16px 0px' }}>
                  Tất cả nội dung trang web và ý kiến phê bình của quý khách đều
                  là tài sản của chúng tôi. Nếu chúng tôi phát hiện bất kỳ thông
                  tin giả mạo nào, chúng tôi sẽ khóa tài khoản của quý khách
                  ngay lập tức hoặc áp dụng các biện pháp khác theo quy định của
                  pháp luật Việt Nam.
                </Typography>

                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  4. Chấp nhận đơn hàng và giá cả
                </Typography>

                <Typography variant="subtitle1" sx={{ margin: '16px 0px' }}>
                  Chúng tôi có quyền từ chối hoặc hủy đơn hàng của quý khách vì
                  bất kỳ lý do gì liên quan đến lỗi kỹ thuật, hệ thống một cách
                  khách quan vào bất kỳ lúc nào.
                </Typography>

                <Typography variant="subtitle1" sx={{ margin: '16px 0px' }}>
                  Ngoài ra, để đảm bảo tính công bằng cho khách hàng là người
                  tiêu dùng cuối cùng của Tiki, chúng tôi cũng sẽ từ chối các
                  đơn hàng không nhằm mục đích sử dụng cho cá nhân, mua hàng số
                  lượng nhiều hoặc với mục đích mua đi bán lại.
                </Typography>

                <Typography variant="subtitle1" sx={{ margin: '16px 0px' }}>
                  Chúng tôi cam kết sẽ cung cấp thông tin giá cả chính xác nhất
                  cho người tiêu dùng. Tuy nhiên, đôi lúc vẫn có sai sót xảy ra,
                  ví dụ như trường hợp giá sản phẩm không hiển thị chính xác
                  trên trang web hoặc sai giá, tùy theo từng trường hợp chúng
                  tôi sẽ liên hệ hướng dẫn hoặc thông báo về đơn hàng đó cho quý
                  khách. Chúng tôi cũng có quyền từ chối hoặc hủy bỏ bất kỳ đơn
                  hàng nào dù đơn hàng đó đã hay chưa được xác nhận hoặc đã
                  thanh toán.
                </Typography>

                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  5. Thay đổi hoặc hủy bỏ giao dịch tại Tiki
                </Typography>

                <Typography variant="subtitle1" sx={{ margin: '16px 0px' }}>
                  Chúng tôi cam kết sẽ cung cấp thông tin giá cả chính xác nhất
                  cho người tiêu dùng. Tuy nhiên, đôi lúc vẫn có sai sót xảy ra,
                  ví dụ như trường hợp giá sản phẩm không hiển thị chính xác
                  trên trang web hoặc sai giá, tùy theo từng trường hợp chúng
                  tôi sẽ liên hệ hướng dẫn hoặc thông báo về đơn hàng đó cho quý
                  khách. Chúng tôi cũng có quyền từ chối hoặc hủy bỏ bất kỳ đơn
                  hàng nào dù đơn hàng đó đã hay chưa được xác nhận hoặc đã
                  thanh toán.
                </Typography>
              </Box>
            </Container>
          </Container>
        </Container>
      </Page>
    </HomeLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const termRes = await TermAndPolicy.getTerm().catch(() => {
    return { data: null };
  });

  const policyRes = await TermAndPolicy.getPolicy().catch(() => {
    return { data: null };
  });

  return {
    props: {
      term: termRes.data,
      policy: policyRes.data,
    },
  };
};

export default withRouter(CustomerSp);
