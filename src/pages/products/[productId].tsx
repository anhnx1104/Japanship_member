import CalculateIcon from '@mui/icons-material/Calculate';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TranslateIcon from '@mui/icons-material/Translate';
import LoadingButton from '@mui/lab/LoadingButton';
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FeaturedProductsSlide from 'components/Product/FeaturedProducts';
import BreadcrumbsProductDetail from 'components/Product/ProductDetail/BreadCrumb';
import Help from 'components/Product/ProductDetail/Help';
import SellerInfo from 'components/Product/ProductDetail/SellerInfo';
import ProductThumbsSlide from 'components/Product/ProductThumbs';
import TypographyWithSkeleton from 'components/TypographyWithSkeleton';
import TypographyWrap from 'components/TypographyWrap';
import { ON_SALE_PRODUCT } from 'constant/common';
import {
  BUY_NOW_PATH,
  ESTIMATE_PRICE_PATH,
  LOGIN_PATH,
  PRODUCT_DETAIL_PATH,
} from 'constant/route-path';
import useAuth from 'hooks/useAuth';
import useNotification from 'hooks/useNotification';
import useShoppingCart from 'hooks/useShoppingCart';
import HomeLayout from 'layouts/Home';
import { useRouter } from 'next/router';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import product from 'services/product';
import type { Comment, Product, ProductDetail } from 'types/product';
import getMessageError from 'utils/controlMessage';
import currency from 'utils/Currency';
import LocalStorage from 'utils/LocalStorage';
import wait from 'utils/wait';

const ProductDetailPage = () => {
  const { t } = useTranslation();
  const setNotification = useNotification();
  const { query, push } = useRouter();
  const { isAuthenticated, refetch: refetchUserInfo } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingScreen, setLoadingScreen] = useState<boolean>(false);
  const [similarProduct, setSimilarProduct] = useState<Product[]>([]);
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(
    null
  );

  const [isOpenSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);
  const [isAddToCartSuccess, setAddToCartSuccess] = useState<boolean>(false);
  const { productId } = query;
  let winRef: Window | null = null;
  const { refetch, priceRate, setBuyItems } = useShoppingCart();
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentShowed, setCommentShowed] = useState<Comment[]>([]);
  const [numberCommentShowed, setNumberCommentShowed] = useState<number>(5);
  const [isShowMoreDescription, setShowMoreDescription] =
    useState<boolean>(false);
  const refDes = useRef<HTMLSpanElement>(null);

  const getProductDetail = useCallback(() => {
    if (typeof productId !== 'string') {
      return;
    }

    product.getProductDetail(productId).then((response) => {
      if (response.data) {
        setProductDetail(response.data._source || []);
        setComments(response.data._source?.comments || []);
      }
    });
  }, [productId]);

  const getRelatedProduct = useCallback(() => {
    if (typeof productId !== 'string') {
      return;
    }

    setSimilarProduct([]);
    product
      .getRelatedProduct({ id: [productId] })
      .then((response) => {
        if (response.data) {
          setSimilarProduct(response.data[0]?.items || []);
        }
      })
      .catch((error) => {});
  }, [productId]);

  useEffect(() => {
    if (typeof productId !== 'string') {
      return;
    }
    setLoadingScreen(true);
    product
      .updateNewestProductDetail(productId)
      .then((res) => {
        if (res.data) {
          setProductDetail(res.data.product || null);
          setComments(res.data.product.comments || []);
          setSimilarProduct(res.data.relatedItem?.items || []);
        } else {
          getProductDetail();
          getRelatedProduct();
        }
      })
      .catch((error) => {
        getProductDetail();
        getRelatedProduct();
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  }, [productId, getProductDetail, getRelatedProduct]);

  useEffect(() => {
    if (!productDetail) return;
    product.addWatchedProduct({
      id: productDetail.id,
      name: productDetail.name,
      price: productDetail.price,
      thumbnailUrl: productDetail?.thumbnails?.[0],
    });
  }, [productDetail]);

  useEffect(() => {
    if (numberCommentShowed > 5) {
      const commentShow = comments.slice(0, numberCommentShowed);
      setCommentShowed(commentShow);
    } else {
      const commentShow = comments.slice(0, 5);
      setCommentShowed(commentShow);
    }

    if (numberCommentShowed > comments?.length) {
      setNumberCommentShowed(comments?.length);
    }
  }, [numberCommentShowed, comments]);

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
  };

  const openEstimateWindow = () => {
    window.open(
      window.location.origin +
        ESTIMATE_PRICE_PATH +
        `?price=${productDetail?.price}`,
      '_blank',
      'toolbar=0,location=0,menubar=0'
    );
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      LocalStorage.set('last-path', PRODUCT_DETAIL_PATH);
      LocalStorage.set('last-product', productId || '');
      push(LOGIN_PATH);
      return;
    }

    if (!productDetail) return;
    setLoading(true);
    product
      .addToCart({
        id: productDetail.id,
        name: productDetail.name,
        price: productDetail.price,
        brand: productDetail?.item_brand?.name || '',
        size: productDetail?.item_size?.name || '',
        status: productDetail.status,
        image: productDetail?.thumbnails?.[0],
        condition: productDetail?.item_condition?.name || '',
        shippingDuration: productDetail?.shipping_duration?.name || '',
        shippingMethod: productDetail?.shipping_method?.name || '',
      })
      .then((response) => {
        setAddToCartSuccess(true);
        setOpenSuccessDialog(true);
        refetch();
      })
      .catch((error) => {
        const message = getMessageError(error) || 'message.systemError';
        setNotification({
          message: t(message),
          severity: 'error',
        });
      })
      .finally(async () => {
        setLoading(false);
        await wait(3000);
        setOpenSuccessDialog(false);
      });
  };

  const handleTranslate = (type: string) => () => {
    if (!productDetail) return;
    const url = `${window.location.origin}/translate/${productDetail.id}?type=${type}`;
    if (!winRef || winRef.closed || winRef.document.location.href !== url) {
      winRef = window.open('', 'winPop', 'toolbar=0,location=0,menubar=0');
      if (winRef === null || winRef.document.location.href !== url) {
        winRef = window.open(url, 'winPop');
      }
    } else {
      winRef.focus();
    }
  };

  const changeToBuyNow = () => {
    if (!isAuthenticated) {
      LocalStorage.set('last-path', PRODUCT_DETAIL_PATH);
      LocalStorage.set('last-product', productId || '');
      push(LOGIN_PATH);
      return;
    }

    refetchUserInfo();
    if (productDetail) {
      setBuyItems([
        {
          id: productDetail.id,
          name: productDetail.name,
          price: productDetail.price,
          brand: productDetail?.item_brand?.name || '',
          size: productDetail?.item_size?.name || '',
          status: productDetail.status,
          image: productDetail?.thumbnails?.[0],
          condition: productDetail?.item_condition?.name || '',
          shippingDuration: productDetail?.shipping_duration?.name || '',
          shippingMethod: productDetail?.shipping_method?.name || '',
        },
      ]);
    }
    push(BUY_NOW_PATH);
  };

  const showMoreComments = () => {
    const newNumberCommentShow = numberCommentShowed + 10;
    if (numberCommentShowed > comments?.length) {
      setNumberCommentShowed(comments?.length);
      return;
    }

    if (numberCommentShowed === comments?.length) {
      setNumberCommentShowed(5);
      return;
    }
    setNumberCommentShowed(newNumberCommentShow);
  };

  const toggleMoreDescription = () => {
    setShowMoreDescription(!isShowMoreDescription);
  };

  return (
    <HomeLayout>
      <Container
        maxWidth="lg"
        sx={{ py: 3, mt: { xs: 13, sm: 16 } }}
        disableGutters
      >
        <BreadcrumbsProductDetail productDetail={productDetail} />
        <Grid
          container
          spacing={1}
          sx={{
            bgcolor: 'background.paper',
            width: 1,
            ml: 0,
            p: 1,
            alignItems: 'flex-start',
          }}
        >
          <Grid item xs={12} s700={6} md={6} lg={5}>
            <ProductThumbsSlide
              photos={productDetail?.photos || []}
              isLoading={loadingScreen}
            />
          </Grid>
          <Grid
            container
            item
            xs={12}
            s700={6}
            md={6}
            lg={5}
            spacing={1}
            sx={{ mt: { xs: 2, s700: 0 } }}
          >
            <Grid item xs={12} sm={12} md={12}>
              <TypographyWithSkeleton
                typographyProps={{
                  variant: 'h5',
                  sx: { color: 'vShip.text.main' },
                }}
                isLoadingScreen={loadingScreen}
              >
                {productDetail?.name}
              </TypographyWithSkeleton>
            </Grid>
            <Grid container item xs={12} sm={12} md={12} spacing={1}>
              <Grid item xs={4} sm={4} md={4}>
                <TypographyWithSkeleton isLoadingScreen={loadingScreen}>
                  {t('label.product.price')}
                </TypographyWithSkeleton>
              </Grid>
              <Grid item xs={8} sm={8} md={8}>
                <TypographyWithSkeleton
                  typographyProps={{
                    variant: 'h5',
                    sx: { color: 'vShip.text.main' },
                  }}
                  isLoadingScreen={loadingScreen}
                >
                  {(productDetail &&
                    currency.templatePriceVI(
                      productDetail.price * priceRate
                    )) ||
                    0}
                  VND
                </TypographyWithSkeleton>
                <TypographyWithSkeleton
                  typographyProps={{
                    variant: 'h6',
                    sx: { color: 'vShip.text.main' },
                  }}
                  isLoadingScreen={loadingScreen}
                >
                  {currency.templatePriceVI(productDetail?.price) || 0} JPY
                </TypographyWithSkeleton>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Divider />
            </Grid>
            <Grid container item xs={12} sm={12} md={12}>
              {!loadingScreen ? (
                <Fragment>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    sx={{
                      minHeight: 35,
                      display: 'flex',
                      alignItems: 'center',
                      pl: 1.5,
                    }}
                  >
                    <Typography variant="h6">
                      {t('label.product.branch')}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    sx={{
                      minHeight: 35,
                      display: 'flex',
                      alignItems: 'center',
                      color: 'vShip.product.main',
                    }}
                  >
                    <Typography>{productDetail?.item_brand?.name}</Typography>
                  </Grid>
                </Fragment>
              ) : (
                <Skeleton variant="rectangular" height={35} width="inherit" />
              )}
            </Grid>

            <Grid container alignItems="center" item xs={12} sm={12} md={12}>
              {!loadingScreen ? (
                <Fragment>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    sx={{
                      backgroundColor: 'vShip.product.bg',
                      minHeight: 35,
                      display: 'flex',
                      alignItems: 'center',
                      pl: 1.5,
                    }}
                  >
                    <Typography variant="h6">
                      {t('label.product.size')}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    sx={{
                      backgroundColor: 'vShip.product.bg',
                      minHeight: 35,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Typography>{productDetail?.item_size?.name}</Typography>
                  </Grid>
                </Fragment>
              ) : (
                <Skeleton variant="rectangular" height={35} width="inherit" />
              )}
            </Grid>
            <Grid container alignItems="center" item xs={12} sm={12} md={12}>
              {!loadingScreen ? (
                <Fragment>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    sx={{
                      minHeight: 35,
                      display: 'flex',
                      alignItems: 'center',
                      pl: 1.5,
                    }}
                  >
                    <Typography variant="h6">
                      {t('label.product.condition')}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    sx={{
                      minHeight: 35,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Typography>
                      {productDetail?.item_condition?.name}
                    </Typography>
                  </Grid>
                </Fragment>
              ) : (
                <Skeleton variant="rectangular" height={35} width="inherit" />
              )}
            </Grid>
            <Grid container alignItems="center" item xs={12} sm={12} md={12}>
              {!loadingScreen ? (
                <Fragment>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    sx={{
                      backgroundColor: 'vShip.product.bg',
                      minHeight: 35,
                      display: 'flex',
                      alignItems: 'center',
                      pl: 1.5,
                    }}
                  >
                    <Typography variant="h6">
                      {t('label.product.japanTax')}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    sx={{
                      backgroundColor: 'vShip.product.bg',
                      minHeight: 35,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Typography>Đã bao gồm thuế</Typography>
                  </Grid>
                </Fragment>
              ) : (
                <Skeleton variant="rectangular" height={35} width="inherit" />
              )}
            </Grid>
            <Grid container alignItems="center" item xs={12} sm={12} md={12}>
              {!loadingScreen ? (
                <Fragment>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    sx={{
                      minHeight: 35,
                      display: 'flex',
                      alignItems: 'center',
                      pl: 1.5,
                    }}
                  >
                    <Typography variant="h6">
                      {t('label.product.internalShipPrice')}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    sx={{
                      minHeight: 35,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Typography>
                      {productDetail?.shipping_payer?.name}
                    </Typography>
                  </Grid>
                </Fragment>
              ) : (
                <Skeleton variant="rectangular" height={35} width="inherit" />
              )}
            </Grid>
            <Grid container alignItems="center" item xs={12} sm={12} md={12}>
              {!loadingScreen ? (
                <Fragment>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    sx={{
                      backgroundColor: 'vShip.product.bg',
                      minHeight: 35,
                      display: 'flex',
                      alignItems: 'center',
                      pl: 1.5,
                    }}
                  >
                    <Typography variant="h6">
                      {t('label.product.status')}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    sx={{
                      backgroundColor: 'vShip.product.bg',
                      minHeight: 35,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {productDetail?.status === ON_SALE_PRODUCT ? (
                      <TypographyWithSkeleton
                        typographyProps={{
                          variant: 'h6',
                          sx: { color: 'success.dark' },
                        }}
                        isLoadingScreen={loadingScreen}
                      >
                        {t('title.inStock')}
                      </TypographyWithSkeleton>
                    ) : (
                      <TypographyWithSkeleton
                        typographyProps={{
                          variant: 'h6',
                          sx: { color: 'success.dark' },
                        }}
                        isLoadingScreen={loadingScreen}
                      >
                        {t('title.outStock')}
                      </TypographyWithSkeleton>
                    )}
                  </Grid>
                </Fragment>
              ) : (
                <Skeleton variant="rectangular" height={35} width="inherit" />
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              {!loadingScreen ? (
                <Fragment>
                  <Grid
                    container
                    alignItems="center"
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    spacing={1}
                  >
                    <Grid item xs={12} s465={6} s700={8} md={6}>
                      <LoadingButton
                        sx={{
                          backgroundColor: 'vShip.product.important',
                          '&:disabled': {
                            backgroundColor: 'vShip.text.disabled2',
                            color: 'primary.contrastText',
                          },
                          px: { xs: 1 },
                        }}
                        fullWidth
                        loading={loading}
                        disabled={!(productDetail?.status === ON_SALE_PRODUCT)}
                        startIcon={<ShoppingCartIcon />}
                        loadingPosition="start"
                        size="large"
                        onClick={handleAddToCart}
                      >
                        {t('button.addToCart')}
                      </LoadingButton>
                    </Grid>
                    <Grid item xs={12} s465={6} s700={4} md={6}>
                      <Button
                        sx={{
                          backgroundColor: 'vShip.product.important',
                          '&:disabled': {
                            backgroundColor: 'vShip.text.disabled2',
                            color: 'primary.contrastText',
                          },
                          width: { xs: 1, md: 'auto' },
                          px: { xs: 1, s700: 2 },
                        }}
                        size="large"
                        disabled={!(productDetail?.status === ON_SALE_PRODUCT)}
                        onClick={changeToBuyNow}
                      >
                        {t('button.buyNow2')}
                      </Button>
                    </Grid>
                  </Grid>
                </Fragment>
              ) : (
                <Skeleton variant="rectangular" height={35} width="inherit" />
              )}
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={12}
            sm={12}
            md={12}
            lg={2}
            sx={{ alignItems: 'center' }}
          >
            {!loadingScreen ? (
              <Fragment>
                <Grid
                  item
                  container
                  xs={12}
                  s700={4}
                  md={4}
                  lg={12}
                  sx={{
                    maxHeight: 105,
                    height: { xs: 140, lg: 1 },
                    mt: { xs: 2, lg: 0 },
                    px: { xs: 0, s700: 2, lg: 1 },
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    sx={{ textAlign: 'center' }}
                  >
                    <Button
                      sx={{
                        color: 'vShip.product.main',
                        borderColor: 'vShip.product.main',
                      }}
                      onClick={openEstimateWindow}
                      fullWidth
                      size="medium"
                      variant="outlined"
                      startIcon={<CalculateIcon />}
                    >
                      {t('button.predictPrice')}
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    sx={{ textAlign: 'center' }}
                  >
                    <Button
                      sx={{
                        mt: 1,
                        color: 'vShip.product.main',
                        borderColor: 'vShip.product.main',
                      }}
                      fullWidth
                      size="medium"
                      variant="outlined"
                      endIcon={<KeyboardDoubleArrowRightIcon />}
                    >
                      {t('button.watchInMercary')}
                    </Button>
                  </Grid>
                </Grid>
              </Fragment>
            ) : (
              <Skeleton variant="rectangular" height={105} width="inherit" />
            )}
            <Grid
              item
              xs={6}
              s700={4}
              md={4}
              lg={12}
              sx={{ mt: 2, p: { xs: 1, lg: 0 }, pl: { xs: 0 } }}
            >
              <SellerInfo
                isLoading={loadingScreen}
                productDetail={productDetail}
              />
            </Grid>
            <Grid
              item
              xs={6}
              s700={4}
              md={4}
              lg={12}
              sx={{ mt: 2, p: { xs: 0, lg: 0 }, pr: { xs: 0 } }}
            >
              <Help isLoading={loadingScreen} />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} sx={{ mt: 5 }}>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {!loadingScreen ? (
              <Fragment>
                <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                  <Typography variant="h5">
                    {t('title.productDescription')}
                  </Typography>
                  <Button
                    sx={{
                      ml: 2,
                      color: 'vShip.product.main',
                      borderColor: 'vShip.product.main',
                    }}
                    size="small"
                    variant="outlined"
                    startIcon={<TranslateIcon />}
                    onClick={handleTranslate('description')}
                  >
                    Dịch
                  </Button>
                </Box>
                <TypographyWrap
                  ref={refDes}
                  variant="body2"
                  sx={{
                    overflowY: 'hidden',
                    maxHeight: isShowMoreDescription ? 'fit-content' : 110,
                  }}
                >
                  {productDetail?.description}
                </TypographyWrap>
                {refDes?.current?.scrollHeight &&
                  refDes.current.scrollHeight > 110 && (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        maxWidth: '50%',
                        mt: 2,
                      }}
                    >
                      <Typography
                        variant="body1"
                        align="center"
                        onClick={toggleMoreDescription}
                        sx={{
                          cursor: 'pointer',
                          '&:hover': { opacity: 0.5 },
                          color: 'vShip.text.lightBlue',
                        }}
                      >
                        {isShowMoreDescription ? 'Thu gọn' : 'Xem tất cả'}
                      </Typography>
                    </Box>
                  )}
              </Fragment>
            ) : (
              <Skeleton variant="rectangular" height={200} width="inherit" />
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} sx={{ mt: 5 }}>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {!loadingScreen ? (
              <Fragment>
                <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                  <ChatBubbleOutlineIcon
                    sx={{ width: 35, height: 35, color: 'vShip.product.main' }}
                  />
                  <Typography variant="h5" sx={{ mx: 2 }}>
                    {t('title.comment')} ({productDetail?.num_comments})
                  </Typography>
                  <Button
                    sx={{
                      color: 'vShip.product.main',
                      borderColor: 'vShip.product.main',
                    }}
                    size="small"
                    variant="outlined"
                    startIcon={<TranslateIcon />}
                    onClick={handleTranslate('comment')}
                  >
                    {t('button.translate')}
                  </Button>
                </Box>
                {commentShowed.map((comment, index) => (
                  <Container
                    key={index}
                    maxWidth="sm"
                    disableGutters
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 2,
                      ml: 0,
                    }}
                  >
                    <Avatar
                      src={comment.user.photo_url}
                      sx={{ mr: 2, width: 30, height: 30 }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        borderRadius: 2,
                        backgroundColor: 'vShip.product.bg',
                        p: 1,
                      }}
                    >
                      {comment.message}
                    </Typography>
                  </Container>
                ))}
                {comments?.length > 5 && (
                  <Fragment>
                    <Container
                      maxWidth="sm"
                      disableGutters
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        mb: 2,
                        pl: 6,
                      }}
                    >
                      <Typography
                        variant="body1"
                        align="center"
                        onClick={showMoreComments}
                        sx={{
                          cursor: 'pointer',
                          '&:hover': { opacity: 0.5 },
                          color: 'vShip.text.lightBlue',
                        }}
                      >
                        {numberCommentShowed < comments?.length
                          ? 'Xem thêm'
                          : 'Thu gọn'}
                      </Typography>
                    </Container>
                  </Fragment>
                )}
              </Fragment>
            ) : (
              <Skeleton variant="rectangular" height={300} width="inherit" />
            )}
          </Grid>
        </Grid>
      </Container>
      {similarProduct.length > 0 && (
        <Box sx={{ mb: 14, mt: 3 }}>
          <FeaturedProductsSlide products={similarProduct} />
        </Box>
      )}
      <Dialog
        open={isOpenSuccessDialog}
        onClose={handleCloseSuccessDialog}
        maxWidth="s465"
        fullWidth
      >
        <DialogContent
          sx={{
            textAlign: 'center',
            height: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CheckCircleOutlineIcon
            sx={{
              color: isAddToCartSuccess ? 'success.dark' : 'error.dark',
              width: 50,
              height: 50,
              mb: 2,
            }}
          />
          <DialogContentText
            variant="h5"
            color={isAddToCartSuccess ? 'success.dark' : 'error.dark'}
          >
            {isAddToCartSuccess
              ? t('message.addToCartSuccess')
              : t('message.addToCartError')}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </HomeLayout>
  );
};

export default ProductDetailPage;
