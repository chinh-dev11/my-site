<template>
  <nav
    :class="$style['page-links']"
    :role="$t('navigation.heading')"
    :style="posX"
  >
    <ul>
      <li
        v-for="(appView, index) in appViews"
        :key="appView.name"
        :class="$style['page-links-item']"
      >
        <BaseNavigateLink
          :view="appView"
          :tabindex="tabIndex.nav[index]"
        />
      </li>
    </ul>
  </nav>
</template>

<script>
    import { mapState } from 'vuex';
    import { _setStyleInlineJustify, _viewsFilterPublicAndSort, _arraySortByKey } from '@/utils/helpers';
    import { _appConfig, _firebaseConfig } from '@/config';
    import { _tabIndex } from '@/utils/tabIndex';
    import BaseNavigateLink from './base/BaseNavigateLink';

    export default {
        components: {
            BaseNavigateLink
        },
        data () {
            return {
                tabIndex: _tabIndex,
                appViews: null,
                posX: null
            };
        },
        computed: {
            ...mapState([
                'uid'
            ])
        },
        watch: {
            uid (newVal) {
                if (newVal === _firebaseConfig.adminUid) {
                    this.appViews = _arraySortByKey(_appConfig.views, 'order'); // all routes
                } else {
                    this.appViews = _viewsFilterPublicAndSort(_appConfig.views, 'order'); // except private/admin route
                }
            
            }
        },
        created () {
            // filter (not to include private route in navigaton) and sort views array from config
            this.appViews = _viewsFilterPublicAndSort(_appConfig.views, 'order');
            
            // set/keep the nav (pageLinks) dots to the right aligning with the hamburger icon
            setInlineStyle(this);

            window.addEventListener('resize', () => setInlineStyle(this));
        },
        beforeDestroy () {
            window.removeEventListener('resize', setInlineStyle);
        }
    };

    const setInlineStyle = (vm) => {
        vm.posX = _setStyleInlineJustify('right');
    };
</script>

<style lang="scss" module>
.page-links {
  font-family: $nav-font-family;
  font-size: 2em;
  margin-bottom: 1.5em;
}
</style>