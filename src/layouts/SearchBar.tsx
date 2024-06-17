import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import SelectMenu from 'components/Header/SelectMenu';
import Image from 'components/Image';
import useCategory from 'hooks/useCategory';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, KeyDownEvent } from 'types/react';
import LocalStorage from 'utils/LocalStorage';

interface Props {
  category: string;
  searchText: string;
  setCategory: Dispatch<SetStateAction<string>>;
  setSearchText: Dispatch<SetStateAction<string>>;
}

const SearchBar = (props: Props) => {
  const { category, searchText, setCategory, setSearchText } = props;
  const router = useRouter();
  const { t } = useTranslation();
  const { rootCategory } = useCategory();
  const theme = useTheme();

  const handleSearch = () => {
    LocalStorage.set('categoryTrack', category ? [category] : []);
    LocalStorage.set('categoryForcus', category);
    router.push({
      pathname: '/search',
      query: {
        name: searchText,
        category: [category],
      },
    });
  };
  const handleKeyDown: KeyDownEvent = (event) => {
    if (event.key === 'Enter') {
      LocalStorage.set('categoryTrack', category ? [category] : []);
      LocalStorage.set('categoryForcus', category);
      router.push({
        pathname: '/search',
        query: {
          name: searchText,
          category: [category],
        },
      });
    }
  };

  const handleChangeSearch: ChangeEvent = (event) => {
    setSearchText(event.target.value);
  };

  const handleChangeCategory = (value: string) => {
    setCategory(value);
  };

  return (
    <Toolbar
      sx={{
        backgroundColor: 'background.paper',
        height: 50,
      }}
    >
      <Container maxWidth="lg" sx={{ display: 'flex', px: 2 }} disableGutters>
        <Box>
          <Image
            sx={{
              objectFit: 'contain',
              display: { sm: 'block', xs: 'none' },
            }}
            src="/static/imgs/mercari-logo.png"
            alt="mercari-logo"
          />
        </Box>
        <Container maxWidth="s700" sx={{ px: { xs: 0, sm: 2 }, mt: 0.4 }}>
          <Box
            sx={{
              display: 'flex',
              bgcolor: 'common.white',
              borderRadius: { xs: 0, s465: 1 },
              overflow: 'hidden',
            }}
          >
            <SelectMenu
              value={category}
              data={rootCategory ?? []}
              onChange={handleChangeCategory}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                width: 1,
              }}
            >
              <TextField
                fullWidth
                onKeyDown={handleKeyDown}
                onChange={handleChangeSearch}
                placeholder={t('placeholder.search')}
                value={searchText}
                InputProps={{
                  inputProps: {
                    sx: {
                      py: { xs: 1 },
                    },
                  },
                  sx: {
                    [`& .${outlinedInputClasses.notchedOutline}`]: {
                      border: 'none',
                    },
                    fontSize: {
                      xs: theme.typography.caption.fontSize,
                      s465: theme.typography.body2.fontSize,
                    },
                    background: (theme) => theme.palette.neutral[100],
                    borderRadius: 0,
                  },
                }}
              />
              <IconButton
                sx={{
                  backgroundColor: 'primary.main',
                  borderRadius: {
                    xs: '0px 5px 5px 0px',
                    s465: '0px 10px 10px 0px',
                  },
                  color: 'common.white',
                  width: { xs: 35, s465: 51 },
                  '&:hover': {
                    backgroundColor: 'primary.main',
                  },
                }}
                onClick={handleSearch}
              >
                <SearchIcon />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Container>
    </Toolbar>
  );
};

export default SearchBar;
