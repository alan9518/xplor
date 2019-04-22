/* ==========================================================================
 * Get and Export All Components 
 * 25/10/2018
 * Alan Medina Silva
 ========================================================================== */


// --------------------------------------
// Layouts
// --------------------------------------
    import {SideBar, SideBarLink, NavBar, SingleList, DetailsList} from '../layouts';


// --------------------------------------
// Views
// --------------------------------------
    import NewProject from '../views/NewProject/NewProject';
    import UserProfile from '../views/User/UserProfile';


// --------------------------------------
// Components
// --------------------------------------
    import ProfileImage from './Users/ProfileImage';
    import Search from './Search/Search';
    import AppButton from './Buttons/AppButton';
    import SingleButton from './Buttons/SingleButton' ;
    import ProjectCard from './Cards/ProjectCard';
    import CardHeaderWide from './Cards/CardHeaderWide';
    import CardImage from './Cards/CardImage';
    import Carrousel from './Carrousel/Carrousel';
    import Breadcumbs from './Breadcumbs/BreadCumbs';
    import WideCard from './Cards/WideCard';
    import CardTabContent from './Cards/CardTabContent';
    import AppModal from './Modal/Modal';
    import ProjectLink from './Links/ProjectLink';
    import MaterialButton from './Buttons/MaterialButton';
    import HistoryList from './LibraryHistory/HistoryList';
    import SingleSelect from './Select/SingleSelect';
    import MultipleSelect from './Select/MultipleSelect';
    import TabsLayout from './Tabs/TabsLayout';
    import Scroller from './InfiniteScroll/Scroller';
    import ProjectsHolder from './Projects/ProjectsHolder'
    import AppLoader from './Loader/Loader';
    import NoData from './NoData/NoData';
    import ListItem from './Cards/CardHeaderListItem';
    import ErrorBoundary from './ErrorHandler/ErrorBoundary';
    import CustomTabs from './Tabs/CustomTabs';
    import PanelContent from './Tabs/PanelContent';
    import FieldsMaker from './fieldsMaker/FieldsMaker';
    import FieldItem from './FieldsMaker/FieldItem';
    import FieldList from './FieldsMaker/FieldList';
    import ToggleField from './FieldsMaker/ToggleField';
    import RowContainer from './FieldsMaker/RowContainer';
    import ToolTip from './ToolTip/ToolTip';
    import CheckList from './CheckList/CheckList';
    import CheckBox from './CheckBox/CheckBox';


// --------------------------------------
// Forms
// --------------------------------------
    import NewProjectForm from './Forms/Projects/NewProjectForm';

// --------------------------------------
// Export Components
// --------------------------------------
    export {
        SideBar,
        SideBarLink,
        NavBar,
        ProfileImage,
        Search,
        AppButton,
        SingleButton,
        ProjectCard,
        Carrousel,
        SingleList,
        DetailsList,
        Breadcumbs,
        WideCard,
        CardTabContent,
        CardImage,
        CardHeaderWide,
        ProjectLink,
        AppModal,
        MaterialButton,
        NewProject,
        NewProjectForm,
        HistoryList,
        SingleSelect,
        MultipleSelect,
        TabsLayout,
        UserProfile,
        Scroller,
        ProjectsHolder,
        AppLoader,
        NoData,
        ListItem,
        ErrorBoundary,
        CustomTabs,
        PanelContent,
        FieldsMaker,
        FieldItem,
        FieldList,
        RowContainer,
        ToggleField,
        ToolTip,
        CheckList,
        CheckBox,
    }