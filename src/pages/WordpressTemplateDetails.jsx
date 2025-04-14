"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  ChevronDown,
  ChevronRight,
  MoreVertical,
  ExternalLink,
  Search,
  Edit,
  Code,
  MenuIcon,
  Trash2,
  Download,
  RefreshCw,
  Power,
  PowerOff,
  Package,
  CreditCard,
  Tag,
  TruckIcon,
  RotateCcw,
  FileText,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import {
  Card,
  CardDescription,
  CardTitle,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { AppRoutes } from "@/constant/constant";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function WordpressTemplateDetails() {
  const [menus, setMenus] = useState([]);
  const [pages, setPages] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const [showPageModal, setShowPageModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showMenuItemModal, setShowMenuItemModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pagesLoading, setPagesLoading] = useState(false);
  const [menusLoading, setMenusLoading] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState("pages");
  const [activeTab, setActiveTab] = useState("pages"); // Default to plugin tab for testing
  const [selectedMenuForSidebar, setSelectedMenuForSidebar] = useState(null);
  const [showAllItemsModal, setShowAllItemsModal] = useState(false);
  const [allMenuItems, setAllMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [shippingClasses, setShippingClasses] = useState([]);
  const [orderNotes, setOrderNotes] = useState([]);
  const [orderRefunds, setOrderRefunds] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [selectedShippingClass, setSelectedShippingClass] = useState(null);
  const [productsLoading, setProductsLoading] = useState(false)
  const [showProductModal, setShowProductModal] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();
  const { path, tab } = useParams();

  // Set the path in cookies when component mounts
  useEffect(() => {
    if (path) {
      Cookies.set("path", path);
    }
  }, [path]);

  // Set active tab based on URL
  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);

  // Plugin related states
  const [plugins, setPlugins] = useState([]);
  const [showPluginModal, setShowPluginModal] = useState(false);
  const [selectedPlugin, setSelectedPlugin] = useState(null);
  const [pluginActionLoading, setPluginActionLoading] = useState({});
  const [pluginSearchTerm, setPluginSearchTerm] = useState("");
  const [activePluginFilter, setActivePluginFilter] = useState("all"); // "all", "active", "inactive"

  // Available plugins for installation
  const availablePlugins = [
    {
      name: "Yoast SEO",
      slug: "wordpress-seo",
      description:
        "A comprehensive SEO plugin that helps optimize your WordPress site for search engines, offering features like XML sitemaps and content analysis.",
    },
    {
      name: "WooCommerce",
      slug: "woocommerce",
      description:
        "A flexible, open-source eCommerce solution built on WordPress, empowering you to sell anything online.",
    },
    {
      name: "Akismet Anti-Spam",
      slug: "akismet",
      description:
        "An advanced anti-spam plugin that filters out spam comments and form submissions, protecting your site from malicious content.",
    },
    {
      name: "Contact Form 7",
      slug: "contact-form-7",
      description:
        "A simple yet flexible plugin for creating and managing multiple contact forms, with support for customization and CAPTCHA.",
    },
    {
      name: "Elementor",
      slug: "elementor",
      description:
        "A powerful drag-and-drop page builder for WordPress, enabling you to create high-end, pixel-perfect websites with ease.",
    },
    {
      name: "WPForms",
      slug: "wpforms",
      description:
        "A beginner-friendly WordPress form builder that allows you to create beautiful contact forms, feedback forms, and more.",
    },
    {
      name: "Jetpack by WordPress.com",
      slug: "jetpack",
      description:
        "A versatile plugin offering security, performance, and site management tools, including backups, malware scanning, and more.",
    },
    {
      name: "Wordfence Security",
      slug: "wordfence",
      description:
        "A comprehensive security solution for WordPress, featuring a firewall, malware scanner, and login security measures.",
    },
    {
      name: "UpdraftPlus WordPress Backup Plugin",
      slug: "updraftplus",
      description:
        "A reliable backup and restoration plugin that simplifies the process of safeguarding your WordPress site.",
    },
    {
      name: "WP Super Cache",
      slug: "wp-super-cache",
      description:
        "A static caching plugin that generates HTML files to serve visitors, reducing server load and improving site performance.",
    },
    {
      name: "All in One SEO",
      slug: "all-in-one-seo-pack",
      description:
        "A feature-rich SEO plugin designed to help you optimize your WordPress site for higher search engine rankings.",
    },
    {
      name: "Classic Editor",
      slug: "classic-editor",
      description:
        "An official plugin that restores the previous WordPress editor and the 'Edit Post' screen, maintaining compatibility with older workflows.",
    },
    {
      name: "WooCommerce Subscriptions",
      slug: "woocommerce-subscriptions",
      description:
        "An add-on for WooCommerce that allows you to create and manage products with recurring payments.",
    },
    {
      name: "TablePress",
      slug: "tablepress",
      description:
        "A plugin that enables you to create and manage beautiful tables without any coding knowledge, embedding them into posts, pages, or text widgets.",
    },
    {
      name: "Mailchimp for WooCommerce",
      slug: "mailchimp-for-woocommerce",
      description:
        "Integrates your WooCommerce store with Mailchimp, allowing you to sync customer data and automate marketing campaigns.",
    },
    {
      name: "Sucuri Security",
      slug: "sucuri-scanner",
      description:
        "A security plugin offering malware scanning, security activity auditing, and hardening options to protect your WordPress site.",
    },
    {
      name: "Advanced Custom Fields",
      slug: "advanced-custom-fields",
      description:
        "A plugin that allows you to add custom fields to your WordPress edit screens, enhancing content management capabilities.",
    },
    {
      name: "WordPress SEO by RankMath",
      slug: "seo-by-rank-math",
      description:
        "A powerful SEO plugin that offers a comprehensive set of tools to optimize your WordPress site for search engines.",
    },
    {
      name: "SiteGround Optimizer",
      slug: "siteground-optimizer",
      description:
        "A performance optimization plugin developed by SiteGround, offering caching, image optimization, and other speed-enhancing features.",
    },
    {
      name: "Broken Link Checker",
      slug: "broken-link-checker",
      description:
        "Monitors your WordPress site for broken links and missing images, notifying you to maintain site integrity.",
    },
  ];

  const tabs = [
    { display: "Pages", value: "pages" },
    { display: "Plugin", value: "plugin" },
    { display: "Menu", value: "menu" },
    { display: "Custom html & css", value: "custom-html-css" }, // URL-friendly format
    { display: "Shop", value: "shop" },
  ];

  // Sample products data
  const productsItems = [
    {
      id: "1",
      name: "Premium T-Shirt",
      price: "$29.99",
      stock_status: "instock",
      stock_quantity: 45,
      sku: "TS-001",
    },
    {
      id: "2",
      name: "Denim Jeans",
      price: "$59.99",
      stock_status: "instock",
      stock_quantity: 23,
      sku: "DJ-002",
    },
    {
      id: "3",
      name: "Leather Wallet",
      price: "$39.99",
      stock_status: "outofstock",
      stock_quantity: 0,
      sku: "LW-003",
    },
  ];

  // Sample orders data
  const Itemsorders = [
    {
      id: "1001",
      customer: "Ahmed Nawaz",
      date: "2023-04-12",
      status: "processing",
      total: "$129.97",
    },
    {
      id: "1002",
      customer: "Abdullah",
      date: "2023-04-11",
      status: "completed",
      total: "$59.99",
    },
    {
      id: "1003",
      customer: "Jawwad",
      date: "2023-04-10",
      status: "on-hold",
      total: "$89.98",
    },
  ];

  // Sample coupons data
  const Itemscoupons = [
    {
      id: "SUMMER20",
      description: "Summer Sale 20% Off",
      discount_type: "percent",
      amount: "20%",
      expiry_date: "2023-08-31",
    },
    {
      id: "WELCOME10",
      description: "New Customer Discount",
      discount_type: "percent",
      amount: "10%",
      expiry_date: "2023-12-31",
    },
    {
      id: "FREESHIP",
      description: "Free Shipping",
      discount_type: "fixed_cart",
      amount: "Shipping Cost",
      expiry_date: "2023-06-30",
    },
  ];

  const [formData, setFormData] = useState({
    pageTitle: "",
    pageContent: "",
    menuTitle: "",
    menuItemTitle: "",
    menuItemUrl: "",
    menuItemPage: "",
    menuItemParent: "0", // Default to top level
  });

  // API Call Helper
  const apiCall = async (type, data = {}) => {
    try {
      const params = new URLSearchParams({
        type,
        path: path || Cookies.get("path") || "ii",
      });

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) params.append(key, value);
      });

      const response = await fetch(`${AppRoutes.pages}?${params}`);

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const text = await response.text();

      if (text.trim().startsWith("Success:")) {
        return { success: true, message: text.trim() };
      }

      try {
        return text ? JSON.parse(text) : { success: true };
      } catch (error) {
        console.log("Response is not valid JSON:", text);
        return { success: true, message: text };
      }
    } catch (error) {
      console.error("API call error:", error);
      return { error: error.message };
    }
  };

  // Fetch all plugins
  const fetchPlugins = async () => {
    setIsLoading(true);
    try {
      const result = await apiCall("plugin_list");
      if (!result.error) {
        // Ensure each plugin has a 'status' property
        const pluginsWithStatus = Array.isArray(result)
          ? result.map((plugin) => ({
              ...plugin,
              status: plugin.status || "inactive", // Default to inactive if status not provided
              active: plugin.status === "active", // Keep active for backward compatibility
            }))
          : [];
        setPlugins(pluginsWithStatus);
      } else {
        toast.error("Error fetching plugins");
      }
    } catch (error) {
      console.error("Error fetching plugins:", error);
      toast.error("Error fetching plugins");
    } finally {
      setIsLoading(false);
    }
  };

  // Install plugin
  const handleInstallPlugin = async () => {
    if (!selectedPlugin) return;

    const plugin = availablePlugins.find((p) => p.name === selectedPlugin);
    if (!plugin) return;

    // Check if plugin is already installed
    const isAlreadyInstalled = plugins.some((p) => p.name === plugin.name);
    if (isAlreadyInstalled) {
      toast.error(`${plugin.name} is already installed!`);
      return;
    }

    setPluginActionLoading((prev) => ({ ...prev, [plugin.name]: true }));
    try {
      const result = await apiCall("plugin_install", { pname: plugin.slug });
      if (!result.error) {
        toast.success(`${plugin.name} has been installed successfully.`);
        // Add the new plugin with active: false by default
        setPlugins((prevPlugins) => [
          ...prevPlugins,
          { ...plugin, active: false },
        ]);
        setShowPluginModal(false);
        setSelectedPlugin(null);
      } else {
        toast.error("Installation failed");
      }
    } catch (error) {
      console.error("Error installing plugin:", error);
      toast.error("Installation failed");
    } finally {
      setPluginActionLoading((prev) => ({ ...prev, [plugin.name]: false }));
    }
  };

  // Activate plugin
  const handleActivatePlugin = async (plugin) => {
    setPluginActionLoading((prev) => ({ ...prev, [plugin.name]: true }));

    try {
      const result = await apiCall("plugin_activate", {
        pname: plugin.slug || plugin.name,
      });
      console.log("plugin_activate result", result);
      if (!result.error) {
        // Update the plugin's active status in state
        setPlugins((prevPlugins) =>
          prevPlugins.map((p) =>
            p.name === plugin.name
              ? { ...p, active: true, status: "active" }
              : p
          )
        );
        toast.success(`${plugin.name} has been activated successfully.`);
      } else {
        toast.error("Activation failed");
      }
    } catch (error) {
      console.error("Error activating plugin:", error);
      toast.error("Activation failed");
    } finally {
      setPluginActionLoading((prev) => ({ ...prev, [plugin.name]: false }));
    }
  };

  // Inactivate plugin
  const handleInactivatePlugin = async (plugin) => {
    setPluginActionLoading((prev) => ({ ...prev, [plugin.name]: true }));

    try {
      const result = await apiCall("plugin_deactivate", {
        pname: plugin.slug || plugin.name,
      });
      console.log("plugin_inactivate result", result);
      if (!result.error) {
        // Update the plugin's active status in state
        setPlugins((prevPlugins) =>
          prevPlugins.map((p) =>
            p.name === plugin.name
              ? { ...p, active: false, status: "inactive" }
              : p
          )
        );
        toast.success("Successfully Inactivated", result);
      } else {
        toast.error("Deactivation failed");
      }
    } catch (error) {
      console.error("Error deactivating plugin:", error);
      toast.error("Deactivation failed");
    } finally {
      setPluginActionLoading((prev) => ({ ...prev, [plugin.name]: false }));
    }
  };

  // Update plugin
  const handleUpdatePlugin = async (plugin) => {
    setPluginActionLoading((prev) => ({ ...prev, [plugin.name]: true }));
    try {
      const result = await apiCall("plugin_update", {
        pname: plugin.slug || plugin.name,
      });
      if (!result.error) {
        toast.success(`${plugin.name} has been updated successfully.`);
        await fetchPlugins();
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      console.error("Error updating plugin:", error);
      toast.error("Update failed");
    } finally {
      setPluginActionLoading((prev) => ({ ...prev, [plugin.name]: false }));
    }
  };

  // Delete plugin
  const handleDeletePlugin = async (plugin) => {
    setPluginActionLoading((prev) => ({ ...prev, [plugin.name]: true }));
    try {
      const result = await apiCall("plugin_delete", {
        pname: plugin.slug || plugin.name,
      });
      if (!result.error) {
        toast.success(`${plugin.name} has been deleted successfully.`);
        setPlugins((prevPlugins) =>
          prevPlugins.filter((p) => p.name !== plugin.name)
        );
      } else {
        toast.error("Deletion failed");
      }
    } catch (error) {
      console.error("Error deleting plugin:", error);
      toast.error("Deletion failed");
    } finally {
      setPluginActionLoading((prev) => ({ ...prev, [plugin.name]: false }));
    }
  };

  // Fetch all pages
  const fetchPages = async () => {
    setPagesLoading(true);
    try {
      const result = await apiCall("list_page");
      if (!result.error) {
        setPages(Array.isArray(result) ? result : []);
      }
    } catch (error) {
      console.error("Error fetching pages:", error);
      toast.error("Error fetching pages");
    } finally {
      setPagesLoading(false);
    }
  };

  // Fetch all menus
  const fetchMenus = async () => {
    setMenusLoading(true);
    try {
      const result = await apiCall("list_menu");
      if (!result.error) {
        const menuList = Array.isArray(result) ? result : [];
        setMenus(menuList);

        // Select first menu by default
        if (menuList.length > 0 && !selectedMenuForSidebar) {
          setSelectedMenuForSidebar(menuList[0]);
          setSelectedMenu(menuList[0]);
          fetchMenuItems(menuList[0].term_id);
        }
      }
    } catch (error) {
      console.error("Error fetching menus:", error);
      toast.error("Error fetching menus");
    } finally {
      setMenusLoading(false);
    }
  };

  // Fetch menu items with hierarchy
  const fetchMenuItems = async (menuId) => {
    setMenusLoading(true);
    try {
      const response = await apiCall("list_item", { id: menuId });

      if (response.error) {
        console.error("Error fetching menu items:", response.error);
        return;
      }

      // Store all menu items for reference
      setAllMenuItems(response || []);

      // Organize items into a hierarchical structure
      const itemsById = {};
      const rootItems = [];

      // First pass: create all items
      if (Array.isArray(response)) {
        response.forEach((item) => {
          itemsById[item.db_id] = {
            ...item,
            children: [],
            ID: item.db_id,
            menu_item_parent: item.menu_item_parent,
          };
        });

        // Second pass: build hierarchy
        response.forEach((item) => {
          const parentId = item.menu_item_parent;
          if (parentId === "0") {
            rootItems.push(itemsById[item.db_id]);
          } else if (itemsById[parentId]) {
            itemsById[parentId].children.push(itemsById[item.db_id]);
          }
        });
      }

      setMenuItems(rootItems);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      toast.error("Error fetching menu items");
    } finally {
      setMenusLoading(false);
    }
  };

  // Add new page
  const handleAddPage = async () => {
    setIsLoading(true);
    try {
      const result = await apiCall("add_page", {
        title: formData.pageTitle,
        cont: formData.pageContent,
      });

      if (!result.error) {
        await fetchPages();
        setFormData({ ...formData, pageTitle: "", pageContent: "" });
        setShowPageModal(false);
        toast.success("Page added successfully");
      } else {
        toast.error("Failed to add page");
      }
    } catch (error) {
      console.error("Error adding page:", error);
      toast.error("Failed to add page");
    } finally {
      setIsLoading(false);
    }
  };

  // Add new menu
  const handleAddMenu = async () => {
    setIsLoading(true);
    try {
      const result = await apiCall("add_menu", {
        title: formData.menuTitle,
      });

      if (!result.error) {
        await fetchMenus();
        setFormData({ ...formData, menuTitle: "" });
        setShowMenuModal(false);
        toast.success("Menu added successfully");

        // Select the newly created menu
        const updatedMenus = await apiCall("list_menu", {});
        if (!updatedMenus.error) {
          setMenus(Array.isArray(updatedMenus) ? updatedMenus : []);
          if (updatedMenus.length > 0) {
            const newMenu = updatedMenus[updatedMenus.length - 1];
            setSelectedMenu(newMenu);
            setSelectedMenuForSidebar(newMenu);
            setShowMenuItemModal(true);
          }
        }
      } else {
        toast.error("Failed to add menu");
      }
    } catch (error) {
      console.error("Error adding menu:", error);
      toast.error("Failed to add menu");
    } finally {
      setIsLoading(false);
    }
  };

  // Add menu item
  const handleAddMenuItem = async () => {
    setIsLoading(true);

    try {
      const result = await apiCall("add_menu_item", {
        id: selectedMenu.term_id,
        title: formData.menuItemTitle,
        url:
          formData.menuItemPage === "custom"
            ? formData.menuItemUrl
            : formData.menuItemPage,
        pmenu: formData.menuItemParent,
      });

      if (!result.error) {
        // Refresh the menu items
        await fetchMenuItems(selectedMenu.term_id);
        setFormData({
          ...formData,
          menuItemTitle: "",
          menuItemUrl: "",
          menuItemPage: "",
          menuItemParent: "0", // Reset to top level
        });
        setShowMenuItemModal(false);
        toast.success("Menu item added successfully");
      } else {
        toast.error("Failed to add menu item");
      }
    } catch (error) {
      console.error("Error adding menu item:", error);
      toast.error("Failed to add menu item");
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle item expansion
  const toggleExpand = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  // Recursive function to render menu items with hierarchy in table rows
  const renderMenuItemsTable = (items, level = 0) => {
    return items.flatMap((item) => {
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = expandedItems[item.db_id];

      const rows = [
        <TableRow key={item.db_id}>
          <TableCell>
            <div
              className="flex items-center"
              style={{ paddingLeft: `${level * 20}px` }}
            >
              {hasChildren ? (
                <button
                  onClick={() => toggleExpand(item.db_id)}
                  className="text-blue-600 mr-2 focus:outline-none"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              ) : (
                <span className="w-4 h-4 mr-2"></span>
              )}
              {item.title}
            </div>
          </TableCell>
          <TableCell>{item.link || item.url}</TableCell>
          <TableCell>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Edit className="h-4 w-4 text-green-600" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>,
      ];

      // If this item has children and is expanded, add the children rows
      if (hasChildren && isExpanded) {
        rows.push(...renderMenuItemsTable(item.children, level + 1));
      }

      return rows;
    });
  };

  // Flatten all menu items for display in modal dropdown
  const flattenMenuItems = (items, level = 0) => {
    let result = [];
    items.forEach((item) => {
      result.push({
        ...item,
        level: level,
      });
      if (item.children && item.children.length > 0) {
        result = result.concat(flattenMenuItems(item.children, level + 1));
      }
    });
    return result;
  };

  // Get all parent items for the dropdown (flattened hierarchy)
  const getParentOptions = () => {
    if (!selectedMenu) return [];

    // Use allMenuItems instead of menuItems to get all items regardless of hierarchy
    if (!allMenuItems || !allMenuItems.length) return [];

    // Create a flattened list of all menu items for the selected menu
    const menuItemsList = allMenuItems.filter(
      (item) =>
        item.menu_id == selectedMenu.term_id ||
        item.menu_id == selectedMenu.term_taxonomy_id
    );

    return menuItemsList.map((item) => ({
      id: item.db_id,
      title: item.title,
      level: 0, // We'll calculate proper levels below
      parent: item.menu_item_parent,
    }));
  };

  // Handle menu selection in sidebar
  const handleMenuSelect = (menu) => {
    setSelectedMenuForSidebar(menu);
    setSelectedMenu(menu);
    fetchMenuItems(menu.term_id);
  };

  // Open all items modal
  const handleOpenAllItemsModal = (menu) => {
    setSelectedMenu(menu);
    setShowAllItemsModal(true);
    fetchMenuItems(menu.term_id);
  };

  // Open add menu modal from sidebar
  const handleAddMenuFromSidebar = () => {
    setShowMenuModal(true);
  };

  // Handle tab change
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    navigate(`/wordprestemplatedetails/${path}/${newTab}`);
  };

  // Handle plugin filter change
  const handlePluginFilterChange = (filter) => {
    setActivePluginFilter(filter);
  };

  // Filter plugins by search term
  const filteredPlugins = availablePlugins.filter((plugin) =>
    plugin.name.toLowerCase().includes(pluginSearchTerm.toLowerCase())
  );

  const filteredInstalledPlugins = plugins.filter((plugin) => {
    // First filter by search term
    const matchesSearch = plugin.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Then filter by active status if needed
    if (activePluginFilter === "all") return matchesSearch;
    if (activePluginFilter === "active")
      return matchesSearch && plugin.status === "active";
    if (activePluginFilter === "inactive")
      return matchesSearch && plugin.status === "inactive";

    return matchesSearch;
  });

  // Add this function to filter menu items by title (recursive)
  const filterMenuItemsByTitle = (items, term) => {
    if (!term) return items;

    const filtered = [];

    items.forEach((item) => {
      // Check if the current item's title matches the search term
      if (item.title.toLowerCase().includes(term.toLowerCase())) {
        // If it matches, add it to filtered items
        const itemCopy = { ...item };
        if (item.children && item.children.length > 0) {
          itemCopy.children = filterMenuItemsByTitle(item.children, term);
        }
        filtered.push(itemCopy);
      }
      // If it doesn't match but has children, check if any children match
      else if (item.children && item.children.length > 0) {
        const filteredChildren = filterMenuItemsByTitle(item.children, term);
        if (filteredChildren.length > 0) {
          const itemCopy = { ...item };
          itemCopy.children = filteredChildren;
          filtered.push(itemCopy);
        }
      }
    });

    return filtered;
  };

  useEffect(() => {
    fetchMenus();
    fetchPages();
    fetchPlugins();
  }, []);

  useEffect(() => {
    if (selectedMenu) {
      fetchMenuItems(selectedMenu.term_id);
    }
  }, [selectedMenu]);

  // Set active tab based on URL when component mounts
  useEffect(() => {
    // Extract the tab from the URL
    const pathParts = location.pathname.split("/");
    const lastSegment = pathParts[pathParts.length - 1];

    // Check if the last segment matches any of our tabs
    const validTabs = ["pages", "plugin", "menu", "custom-html-css", "shop"];
    if (validTabs.includes(lastSegment)) {
      setActiveTab(lastSegment);

      // Load appropriate data based on the tab
      if (lastSegment === "menu" && menus.length > 0) {
        setSelectedMenuForSidebar(menus[0]);
        setSelectedMenu(menus[0]);
        fetchMenuItems(menus[0].term_id);
      } else if (lastSegment === "plugin") {
        fetchPlugins();
      }
    } else {
      // If no valid tab in URL, update URL to match the default tab
      navigate(`/wordprestemplatedetails/${activeTab}`, { replace: true });
    }
  }, [location.pathname]);

  // Plugin card component with activation/deactivation buttons
  const PluginCard = ({ plugin }) => (
    <Card key={plugin.name} className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{plugin.name}</CardTitle>
            <CardDescription className="mt-1">
              {plugin.description || "No description available"}
            </CardDescription>
          </div>
          <Badge
            variant={plugin.status === "active" ? "default" : "outline"}
            className={
              plugin.status === "active"
                ? "bg-green-100 text-green-800 border-green-200"
                : "bg-red-100 text-red-800 border-red-200"
            }
          >
            {plugin.status === "active" ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center text-sm text-gray-500 gap-4">
          <div className="flex items-center gap-1">
            <span>Version:</span>
            <span className="font-medium">{plugin.version || "Unknown"}</span>
          </div>
          {plugin.update && (
            <div className="flex items-center gap-1">
              <span>Update:</span>
              <span className="font-medium">{plugin.update}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-2">
        {plugin.status !== "active" ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleActivatePlugin(plugin)}
            disabled={pluginActionLoading[plugin.name]}
          >
            {pluginActionLoading[plugin.name] ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Power className="h-4 w-4 mr-2" />
            )}
            Activate
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleInactivatePlugin(plugin)}
            disabled={pluginActionLoading[plugin.name]}
          >
            {pluginActionLoading[plugin.name] ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <PowerOff className="h-4 w-4 mr-2" />
            )}
            Inactivate
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleUpdatePlugin(plugin)}
          disabled={pluginActionLoading[plugin.name]}
        >
          {pluginActionLoading[plugin.name] ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          Update
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={() => handleDeletePlugin(plugin)}
          disabled={pluginActionLoading[plugin.name]}
        >
          {pluginActionLoading[plugin.name] ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4 mr-2" />
          )}
          Delete
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <SidebarProvider>
      <Navbar />
      <Sidebar />

      <div className="ml-16 mt-12 p-6 w-full flex flex-col h-[calc(100vh-3rem)]">
        {/* Header */}
        <div className="p-4 border-b bg-white shadow-sm flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Badge
              variant="outline"
              className="bg-green-100 text-green-800 flex items-center gap-1"
            >
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              Live Environment
            </Badge>
            <Button variant="ghost" size="icon">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <span className="text-sm text-yellow-500 flex items-center gap-2">
              ⚠️ Frontpage is not set. Please publish a page to set it as
              frontpage.
            </span>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Untitled Website</h2>
            <p className="text-sm text-gray-600">No description available.</p>
          </div>
        </div>

        {/* Main Tabs - Moved outside the content area */}
        <div className="border-b bg-white">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => handleTabChange(tab.value)}
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === tab.value
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.display}
              </button>
            ))}
          </div>
        </div>

        {/* Modals */}
        {showPageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-lg font-semibold mb-4">Add New Page</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Page Title*
                  </label>
                  <Input
                    value={formData.pageTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, pageTitle: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Content
                  </label>
                  <textarea
                    className="w-full border rounded p-2 min-h-32"
                    value={formData.pageContent}
                    onChange={(e) =>
                      setFormData({ ...formData, pageContent: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowPageModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddPage}
                  className="text-black"
                  disabled={!formData.pageTitle || isLoading}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    "Add Page"
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Add Menu Modal */}
        <Dialog open={showMenuModal} onOpenChange={setShowMenuModal}>
          <DialogContent className="sm:max-w-[400px] bg-white">
            <DialogHeader>
              <DialogTitle>Add New Menu</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Menu Name*
                </label>
                <Input
                  value={formData.menuTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, menuTitle: e.target.value })
                  }
                  placeholder="Enter menu name"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowMenuModal(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAddMenu}
                disabled={!formData.menuTitle || isLoading}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Menu"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Menu Item Modal */}
        <Dialog open={showMenuItemModal} onOpenChange={setShowMenuItemModal}>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-auto bg-white">
            <DialogHeader>
              <DialogTitle>Add Item to {selectedMenu?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {/* Title input */}
              <div>
                <label className="block text-sm font-medium mb-1">Title*</label>
                <Input
                  value={formData.menuItemTitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      menuItemTitle: e.target.value,
                    })
                  }
                />
              </div>

              {/* Link To selection */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Link To*
                </label>
                <Select
                  value={formData.menuItemPage}
                  onValueChange={(value) => {
                    const isCustom = value === "custom";
                    setFormData({
                      ...formData,
                      menuItemPage: value,
                      menuItemUrl: isCustom ? "" : value,
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a page" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="custom">Custom URL</SelectItem>
                    {pages.map((page) => (
                      <SelectItem
                        key={`page-${page.ID || page.post_title}`}
                        value={
                          page.post_name ||
                          page.post_title.toLowerCase().replace(/\s+/g, "-")
                        }
                      >
                        {page.post_title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Custom URL input */}
              {formData.menuItemPage === "custom" && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Custom URL*
                  </label>
                  <Input
                    value={formData.menuItemUrl}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        menuItemUrl: e.target.value,
                      })
                    }
                    placeholder="https://example.com"
                  />
                </div>
              )}

              {/* Parent Item selection */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Parent Item
                </label>
                <Select
                  value={formData.menuItemParent}
                  onValueChange={(value) =>
                    setFormData({ ...formData, menuItemParent: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select parent item" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="0">-- Top Level --</SelectItem>
                    {getParentOptions().map((item) => (
                      <SelectItem
                        key={`parent-${item.id}`}
                        value={item.id.toString()}
                        className="flex items-center"
                      >
                        <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                          {item.title}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowMenuItemModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddMenuItem}
                disabled={
                  !formData.menuItemTitle ||
                  (formData.menuItemPage === "custom" &&
                    !formData.menuItemUrl) ||
                  isLoading
                }
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Item"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* All Items Modal */}
        <Dialog open={showAllItemsModal} onOpenChange={setShowAllItemsModal}>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-auto bg-white">
            <DialogHeader>
              <DialogTitle>All Items in {selectedMenu?.name}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium">Menu Items</h3>
                <Button
                  size="sm"
                  onClick={() => {
                    setShowAllItemsModal(false);
                    setShowMenuItemModal(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add New Item
                </Button>
              </div>

              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {menuItems.length > 0 ? (
                      renderMenuItemsTable(menuItems)
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={3}
                          className="text-center text-gray-500 py-4"
                        >
                          No items in this menu yet
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Plugin Install Modal */}
        <Dialog open={showPluginModal} onOpenChange={setShowPluginModal}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto bg-white">
            <DialogHeader>
              <DialogTitle>Add New Plugin</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search plugins..."
                  className="pl-10"
                  value={pluginSearchTerm}
                  onChange={(e) => setPluginSearchTerm(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-2">
                {filteredPlugins.map((plugin) => {
                  const isInstalled = plugins.some(
                    (p) => p.name === plugin.name
                  );
                  return (
                    <div
                      key={plugin.name}
                      className={`border rounded-md p-3 cursor-pointer transition-colors ${
                        selectedPlugin === plugin.name
                          ? "border-blue-500 bg-blue-50"
                          : "hover:border-gray-300 hover:bg-gray-50"
                      } ${isInstalled ? "opacity-75 cursor-not-allowed" : ""}`}
                      onClick={() =>
                        !isInstalled && setSelectedPlugin(plugin.name)
                      }
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <div
                            className={`w-4 h-4 rounded-full border ${
                              selectedPlugin === plugin.name
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-300"
                            }`}
                          >
                            {selectedPlugin === plugin.name && (
                              <div className="w-2 h-2 bg-white rounded-full m-auto mt-1"></div>
                            )}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">{plugin.name}</h3>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {plugin.description}
                          </p>
                          {isInstalled && (
                            <span className="text-xs text-green-600 mt-1">
                              Already installed
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredPlugins.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No plugins found matching your search.
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowPluginModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleInstallPlugin}
                disabled={
                  !selectedPlugin ||
                  pluginActionLoading[selectedPlugin] ||
                  plugins.some((p) => p.name === selectedPlugin)
                }
              >
                {pluginActionLoading[selectedPlugin] ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Installing...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    {plugins.some((p) => p.name === selectedPlugin)
                      ? "Already Installed"
                      : "Install Plugin"}
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="flex flex-1 overflow-hidden bg-white">
          {/* Sidebar */}
          <div className="w-64 border-r bg-gray-50 flex flex-col p-4">
            {activeTab === "pages" && (
              <Tabs
                value={activeSubTab}
                onValueChange={setActiveSubTab}
                className="flex flex-col"
              >
                <h3 className="font-medium mb-2 px-2">Page Components</h3>
                <TabsList className="flex flex-col items-start h-auto p-0 bg-transparent">
                  {["pages", "header", "footer"].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className={`w-full justify-start px-2 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 ${
                        activeSubTab === tab ? "border-l-2 border-blue-500" : ""
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            )}

            {activeTab === "plugin" && (
              <>
                <h3 className="font-medium mb-2 px-2">Plugin Categories</h3>
                <div className="flex flex-col gap-1">
                  <button
                    className={`flex items-center gap-2 px-2 py-2 text-left rounded-md hover:bg-blue-50 ${
                      activePluginFilter === "all"
                        ? "bg-blue-50 text-blue-600 border-l-2 border-blue-500"
                        : ""
                    }`}
                    onClick={() => handlePluginFilterChange("all")}
                  >
                    <Package className="h-4 w-4" />
                    <span className="text-sm">All Plugins</span>
                  </button>
                  <button
                    className={`flex items-center gap-2 px-2 py-2 text-left rounded-md hover:bg-blue-50 ${
                      activePluginFilter === "active"
                        ? "bg-blue-50 text-blue-600 border-l-2 border-blue-500"
                        : ""
                    }`}
                    onClick={() => handlePluginFilterChange("active")}
                  >
                    <Power className="h-4 w-4" />
                    <span className="text-sm">Active</span>
                  </button>
                  <button
                    className={`flex items-center gap-2 px-2 py-2 text-left rounded-md hover:bg-blue-50 ${
                      activePluginFilter === "inactive"
                        ? "bg-blue-50 text-blue-600 border-l-2 border-blue-500"
                        : ""
                    }`}
                    onClick={() => handlePluginFilterChange("inactive")}
                  >
                    <PowerOff className="h-4 w-4" />
                    <span className="text-sm">Inactive</span>
                  </button>
                </div>
              </>
            )}

            {activeTab === "menu" && (
              <>
                <div className="flex justify-between items-center mb-2 px-2">
                  <h3 className="font-medium">Menus</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleAddMenuFromSidebar}
                    className="h-7 w-7 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-col gap-1">
                  {menus.length > 0 ? (
                    menus.map((menu) => (
                      <button
                        key={menu.term_id}
                        onClick={() => handleMenuSelect(menu)}
                        className={`flex items-center gap-2 px-2 py-2 text-left rounded-md hover:bg-blue-50 ${
                          selectedMenuForSidebar?.term_id === menu.term_id
                            ? "bg-blue-50 text-blue-600 border-l-2 border-blue-500"
                            : ""
                        }`}
                      >
                        <MenuIcon className="h-4 w-4" />
                        <span className="text-sm">{menu.name}</span>
                        <Trash2 className="h-4 w-4 mr-2 text-red-500 ml-auto" />
                      </button>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500 p-2">
                      No menus created
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === "custom-html-css" && (
              <>
                <h3 className="font-medium mb-2 px-2">Custom Code</h3>
                <div className="text-sm text-gray-500 p-2">
                  No custom HTML/CSS added
                </div>
              </>
            )}

            {activeTab === "shop" && (
              <Tabs
                value={activeSubTab}
                onValueChange={setActiveSubTab}
                className="flex flex-col"
              >
                <h3 className="font-medium mb-2 px-2">Shop Components</h3>
                <TabsList className="flex flex-col items-start h-auto p-0 bg-transparent">
                  {[
                    {
                      id: "products",
                      label: "Products",
                      icon: <Package className="h-4 w-4 mr-2" />,
                    },
                    {
                      id: "orders",
                      label: "Orders",
                      icon: <CreditCard className="h-4 w-4 mr-2" />,
                    },
                    {
                      id: "coupons",
                      label: "Coupons",
                      icon: <Tag className="h-4 w-4 mr-2" />,
                    },
                    {
                      id: "shipping",
                      label: "Shipping",
                      icon: <TruckIcon className="h-4 w-4 mr-2" />,
                    },
                    {
                      id: "refunds",
                      label: "Refunds",
                      icon: <RotateCcw className="h-4 w-4 mr-2" />,
                    },
                  ].map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className={`w-full justify-start px-2 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 flex items-center ${
                        activeSubTab === tab.id
                          ? "border-l-2 border-blue-500"
                          : ""
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Pages Tab */}
            {activeTab === "pages" && (
              <div className="flex-1 p-6 overflow-auto">
                {activeSubTab === "pages" && (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <div className="relative w-96">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search pages..."
                          className="pl-10"
                        />
                      </div>
                      <Button
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => setShowPageModal(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add New Page
                      </Button>
                    </div>

                    {pagesLoading ? (
                      <div className="flex justify-center items-center h-64">
                        <div className="flex flex-col items-center gap-2">
                          <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
                          <p className="text-gray-500">Loading pages...</p>
                        </div>
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Link</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pages.length > 0 ? (
                            pages.map((page) => (
                              <TableRow key={page.ID || page.post_title}>
                                <TableCell className="font-medium">
                                  {page.post_title}
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    variant={
                                      page.post_status === "publish"
                                        ? "default"
                                        : "outline"
                                    }
                                  >
                                    {page.post_status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-blue-500 hover:underline cursor-pointer">
                                  {page.post_name ||
                                    page.post_title
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}
                                </TableCell>
                                <TableCell>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 px-2"
                                    >
                                      <Edit className="h-4 w-4 text-green-600" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 px-2"
                                    >
                                      <Trash2 className="h-4 w-4 mr-2 text-red-500" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell
                                colSpan="4"
                                className="text-center text-gray-500 py-4"
                              >
                                No pages found. Create your first page.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    )}
                  </>
                )}

                {activeSubTab === "header" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Header Content</h2>
                      <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                        <Edit className="h-4 w-4" />
                        Edit Header
                      </Button>
                    </div>
                    <Card>
                      <CardTitle>Preview</CardTitle>
                      <CardDescription className="mb-4">
                        This is how your header will appear on the site
                      </CardDescription>
                      <div className="border rounded-lg p-4 bg-gray-50 overflow-auto max-h-64">
                        <p className="text-gray-500">No content available</p>
                      </div>
                    </Card>
                  </div>
                )}

                {activeSubTab === "footer" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Footer Content</h2>
                      <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                        <Edit className="h-4 w-4" />
                        Edit Footer
                      </Button>
                    </div>
                    <Card>
                      <CardTitle>Preview</CardTitle>
                      <CardDescription className="mb-4">
                        This is how your footer will appear on the site
                      </CardDescription>
                      <div className="border rounded-lg p-4 bg-gray-50 overflow-auto max-h-64">
                        <p className="text-gray-500">No content available</p>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            )}

            {/* Plugin Tab */}
            {activeTab === "plugin" && (
              <div className="flex-1 p-6 overflow-auto">
                <div className="flex justify-between items-center mb-6">
                  <div className="relative w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search plugins..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => setShowPluginModal(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add New Plugin
                  </Button>
                </div>

                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="flex flex-col items-center gap-2">
                      <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
                      <p className="text-gray-500">Loading plugins...</p>
                    </div>
                  </div>
                ) : plugins.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No plugins installed
                    </h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                      Enhance your website's functionality by installing plugins
                      from our collection.
                    </p>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => setShowPluginModal(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Your First Plugin
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {filteredInstalledPlugins.length > 0 ? (
                      filteredInstalledPlugins.map((plugin) => (
                        <PluginCard key={plugin.name} plugin={plugin} />
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No plugins match your search.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Menu Tab */}
            {activeTab === "menu" && (
              <div className="flex-1 p-6 overflow-auto">
                {!selectedMenuForSidebar ? (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Menu Management</h2>
                      <Button
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => setShowMenuModal(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" /> Create New Menu
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">
                        {selectedMenuForSidebar.name} Menu
                      </h2>
                      <Button
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => {
                          setSelectedMenu(selectedMenuForSidebar);
                          setShowMenuItemModal(true);
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add New Item
                      </Button>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                      <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                        <h3 className="font-medium">Menu Items</h3>
                        <div className="relative w-64">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Search items..."
                            className="pl-10 h-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </div>

                      {menusLoading ? (
                        <div className="flex justify-center items-center h-64">
                          <div className="flex flex-col items-center gap-2">
                            <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
                            <p className="text-gray-500">
                              Loading menu items...
                            </p>
                          </div>
                        </div>
                      ) : (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Title</TableHead>
                              <TableHead>URL</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {menuItems.length > 0 ? (
                              renderMenuItemsTable(
                                filterMenuItemsByTitle(menuItems, searchTerm)
                              )
                            ) : (
                              <TableRow>
                                <TableCell
                                  colSpan={3}
                                  className="text-center text-gray-500 py-4"
                                >
                                  No items in this menu yet. Add your first
                                  item.
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Custom HTML & CSS Tab */}
            {activeTab === "custom-html-css" && (
              <div className="flex-1 p-6 overflow-auto">
                <div className="text-center py-8 text-gray-500">
                  No custom HTML/CSS added
                </div>
              </div>
            )}

{activeTab === "shop" && (
          <div className="flex-1 p-6 overflow-auto">
            {/* Products Tab */}
            {activeSubTab === "products" && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <div className="relative w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search products..." className="pl-10" />
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowProductModal(true)}>
                    <Plus className="h-4 w-4 mr-2" /> Add New Product
                  </Button>
                </div>

                {productsLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="flex flex-col items-center gap-2">
                      <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
                      <p className="text-gray-500">Loading products...</p>
                    </div>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {productsItems.length > 0 ? (
                        productsItems.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>{product.id}</TableCell>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.sku}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>
                              <Badge variant={product.stock_status === "instock" ? "default" : "outline"}>
                                {product.stock_status === "instock"
                                  ? `In Stock (${product.stock_quantity})`
                                  : "Out of Stock"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm" className="h-8 px-2">
                                  <Edit className="h-4 w-4 text-green-600" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 px-2">
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-gray-500 py-4">
                            No products found. Create your first product.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </>
            )}

            {/* Shop Tab */}
            {activeSubTab === "orders" && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <div className="relative w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search orders..." className="pl-10" />
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" /> Create Order
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Itemsorders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>#{order.id}</TableCell>
                        <TableCell className="font-medium">
                          {order.customer}
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.status === "completed"
                                ? "default"
                                : order.status === "processing"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.total}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <Edit className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <FileText className="h-4 w-4 text-blue-600" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}

            {/* Coupons Tab */}
            {activeSubTab === "coupons" && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <div className="relative w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search coupons..." className="pl-10" />
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" /> Add New Coupon
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Discount Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Itemscoupons.map((coupon) => (
                      <TableRow key={coupon.id}>
                        <TableCell className="font-medium">
                          {coupon.id}
                        </TableCell>
                        <TableCell>{coupon.description}</TableCell>
                        <TableCell>{coupon.discount_type}</TableCell>
                        <TableCell>{coupon.amount}</TableCell>
                        <TableCell>{coupon.expiry_date}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <Edit className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}

            {/* Shipping Tab */}
            {activeSubTab === "shipping" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Shipping Classes</h2>
                  <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Shipping Class
                  </Button>
                </div>
                <Card className="p-6">
                  <CardTitle>Shipping Zones</CardTitle>
                  <CardDescription className="mb-4">
                    Configure shipping zones and methods for your store
                  </CardDescription>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Region</TableHead>
                        <TableHead>Methods</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Domestic</TableCell>
                        <TableCell>United States</TableCell>
                        <TableCell>Free shipping, Flat rate</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <Edit className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          International
                        </TableCell>
                        <TableCell>Rest of World</TableCell>
                        <TableCell>Flat rate</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <Edit className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Card>
              </div>
            )}

            {/* Refunds Tab */}
            {activeSubTab === "refunds" && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Order Refunds</h2>
                  <div className="relative w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search refunds..." className="pl-10" />
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Refund ID</TableHead>
                      <TableHead>Order</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">RF1001</TableCell>
                      <TableCell>#1002</TableCell>
                      <TableCell>2023-04-15</TableCell>
                      <TableCell>$59.99</TableCell>
                      <TableCell>Customer request</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2"
                          >
                            <FileText className="h-4 w-4 text-blue-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">RF1002</TableCell>
                      <TableCell>#1001</TableCell>
                      <TableCell>2023-04-14</TableCell>
                      <TableCell>$29.99</TableCell>
                      <TableCell>Damaged product</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2"
                          >
                            <FileText className="h-4 w-4 text-blue-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </>
            )}
          </div>
)}
        </div>
      </div>
      </div>
    </SidebarProvider>
  );
}
