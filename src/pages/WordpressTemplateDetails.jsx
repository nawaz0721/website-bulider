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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { AppRoutes } from "@/constant/constant";

export default function MenuManagement() {
  const [menus, setMenus] = useState([]);
  const [pages, setPages] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const [showPageModal, setShowPageModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showMenuItemModal, setShowMenuItemModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState("pages");
  const [activeTab, setActiveTab] = useState("pages");

  const [formData, setFormData] = useState({
    pageTitle: "",
    pageContent: "",
    menuTitle: "",
    menuItemTitle: "",
    menuItemUrl: "",
    menuItemPage: "",
    menuItemParent: "0",
  });

  // API Call Helper
  const apiCall = async (type, data = {}) => {
    try {
      const params = new URLSearchParams({
        type,
        path: Cookies.get("path") || "",
      });
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) params.append(key, value);
      });

      const response = await fetch(
        `${AppRoutes.pages}?${params}`
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const text = await response.text();
      return text ? JSON.parse(text) : { success: true };
    } catch (error) {
      console.error("API call error:", error);
      return { error: error.message };
    }
  };

  // Fetch all pages
  const fetchPages = async () => {
    const result = await apiCall("list_page");
    if (!result.error) {
      setPages(Array.isArray(result) ? result : []);
    }
  };

  // Fetch all menus
  const fetchMenus = async () => {
    const result = await apiCall("list_menu");
    if (!result.error) {
      setMenus(Array.isArray(result) ? result : []);
    }
  };

  // Fetch menu items
  const fetchMenuItems = async (menuId) => {
    const result = await apiCall("list_item", { id: menuId });
    if (!result.error) {
      const items = Array.isArray(result)
        ? result.map((item) => ({
            ID: item.ID || item.id,
            title: item.title || item.post_title,
            url: item.url || item.link,
            menu_item_parent: item.menu_item_parent || item.parent || "0",
            menu_id: menuId,
          }))
        : [];

      setMenuItems(items);

      // Initialize expanded state
      const expanded = {};
      items
        .filter((item) => item.menu_item_parent === "0")
        .forEach((item) => {
          expanded[item.ID] = true;
        });
      setExpandedItems(expanded);
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
      }
    } catch (error) {
      console.error("Error adding page:", error);
      setShowPageModal(false);
    } finally {
      setIsLoading(false);
      setShowPageModal(false);
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
        setShowMenuModal(false);
        setFormData({ ...formData, menuTitle: "" });
      }
      setShowMenuModal(false);
    } catch (error) {
      console.error("Error adding menu:", error);
    } finally {
      setIsLoading(false);
      setShowMenuModal(false);
    }
  };

  // Add menu item
  const handleAddMenuItem = async () => {
    if (!selectedMenu || isLoading) return;

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
        await fetchMenuItems(selectedMenu.term_id);
        setShowMenuItemModal(false);
        setFormData({
          ...formData,
          menuItemTitle: "",
          menuItemUrl: "",
          menuItemPage: "",
          menuItemParent: "0",
        });
      }
      setShowMenuItemModal(false);
    } catch (error) {
      console.error("Error adding menu item:", error);
    } finally {
      setIsLoading(false);
      setShowMenuItemModal(false);
    }
  };

  // Toggle item expansion
  const toggleExpand = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  // Render menu items hierarchically
  const renderMenuItems = (items, level = 0) => {
    return items.map((item) => {
      const children = menuItems.filter(
        (child) =>
          child.menu_item_parent === item.ID.toString() &&
          child.menu_id === item.menu_id
      );

      return (
        <div key={`item-${item.ID}-${item.menu_id}`} className="w-full">
          <div
            className={`flex items-center py-2 ${
              level > 0 ? `pl-${level * 4}` : ""
            }`}
          >
            {children.length > 0 ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleExpand(item.ID)}
                className="mr-2"
              >
                {expandedItems[item.ID] ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </Button>
            ) : (
              <div className="w-6"></div>
            )}

            <div className="flex-1 flex items-center">
              <span className="mr-2">{item.title}</span>
              <Badge variant="outline" className="mr-2">
                {item.url.startsWith("http")
                  ? new URL(item.url).pathname
                  : item.url}
              </Badge>
              <Badge
                variant={
                  item.menu_item_parent === "0" ? "default" : "secondary"
                }
              >
                {item.menu_item_parent === "0" ? "Parent" : "Child"}
              </Badge>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {expandedItems[item.ID] && children.length > 0 && (
            <div className="ml-4">{renderMenuItems(children, level + 1)}</div>
          )}
        </div>
      );
    });
  };

  useEffect(() => {
    fetchMenus();
    fetchPages();
  }, []);

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
                  disabled={!formData.pageTitle || isLoading}
                >
                  {isLoading ? "Adding..." : "Add Page"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {showMenuModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-lg font-semibold mb-4">Add New Menu</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Menu Name*
                  </label>
                  <Input
                    value={formData.menuTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, menuTitle: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowMenuModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddMenu}
                  disabled={!formData.menuTitle || isLoading}
                >
                  {isLoading ? "Adding..." : "Add Menu"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {showMenuItemModal && selectedMenu && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-lg font-semibold mb-4">
                Add Item to {selectedMenu.name}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Title*
                  </label>
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

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Link To*
                  </label>
                  <Select
                    value={formData.menuItemPage}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        menuItemPage: value,
                        menuItemUrl: value === "custom" ? "" : value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a page" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="custom">Custom URL</SelectItem>
                      {pages.map((page) => {
                        const pageValue =
                          page.post_name ||
                          page.post_title.toLowerCase().replace(/\s+/g, "-");
                        // Ensure we have a valid value
                        if (!pageValue) return null;

                        return (
                          <SelectItem key={`page-${page.ID}`} value={pageValue}>
                            {page.post_title}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

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
                    <SelectContent>
                      <SelectItem value="0">-- Top Level --</SelectItem>
                      {menuItems
                        .filter((item) => item.menu_id == selectedMenu.term_id)
                        .filter((item) => item.menu_item_parent === "0")
                        .map((item) => {
                          // Ensure we have a valid ID
                          if (!item.ID) return null;

                          return (
                            <SelectItem
                              key={`parent-${item.ID}`}
                              value={item.ID.toString()}
                            >
                              {item.title}
                            </SelectItem>
                          );
                        })}
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
                  {isLoading ? "Adding..." : "Add Item"}
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-1 overflow-hidden bg-white">
          {/* Sidebar */}
          <div className="w-64 border-r bg-gray-50 flex flex-col p-4">
            <Tabs
              value={activeSubTab}
              onValueChange={setActiveSubTab}
              className="flex flex-col"
            >
              {activeTab === "pages" && (
                <>
                  <h3 className="font-medium mb-2 px-2">Page Components</h3>
                  <TabsList className="flex flex-col items-start h-auto p-0 bg-transparent">
                    {["pages", "header", "footer"].map((tab) => (
                      <TabsTrigger
                        key={tab}
                        value={tab}
                        className={`w-full justify-start px-2 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 ${
                          activeSubTab === tab
                            ? "border-l-2 border-blue-500"
                            : ""
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </>
              )}

              {activeTab === "plugin" && (
                <>
                  <h3 className="font-medium mb-2 px-2">Plugins</h3>
                  <div className="text-sm text-gray-500 p-2">
                    No plugins installed
                  </div>
                </>
              )}

              {activeTab === "menu" && (
                <>
                  <h3 className="font-medium mb-2 px-2">Menu</h3>
                  <div className="text-sm text-gray-500 p-2">
                    {menus.length} menu(s) available
                  </div>
                </>
              )}

              {activeTab === "custom html & css" && (
                <>
                  <h3 className="font-medium mb-2 px-2">Custom Code</h3>
                  <div className="text-sm text-gray-500 p-2">
                    No custom HTML/CSS added
                  </div>
                </>
              )}
            </Tabs>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="flex-1 flex flex-col"
            >
              <div className="border-b">
                <TabsList className="px-4">
                  {["Pages", "Plugin", "Menu", "Custom HTML & CSS"].map(
                    (tab) => (
                      <TabsTrigger
                        key={tab}
                        value={tab.toLowerCase()}
                        className={`${
                          activeTab === tab.toLowerCase()
                            ? "border-b-2 border-blue-500"
                            : ""
                        }`}
                      >
                        {tab}
                      </TabsTrigger>
                    )
                  )}
                </TabsList>
              </div>

              {/* Pages Tab */}
              <TabsContent value="pages" className="flex-1 p-6 overflow-auto">
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
                                /
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
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 px-2"
                                      >
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                      <DropdownMenuItem>
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        View
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Code className="h-4 w-4 mr-2" />
                                        View Source
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
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
              </TabsContent>

              {/* Plugin Tab */}
              <TabsContent value="plugin" className="flex-1 p-6 overflow-auto">
                <div className="text-center py-8 text-gray-500">
                  No plugins installed
                </div>
              </TabsContent>

              {/* Menu Tab */}
              <TabsContent value="menu" className="flex-1 p-6 overflow-auto">
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

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Menu Name</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {menus.map((menu) => (
                        <TableRow key={menu.term_id}>
                          <TableCell className="font-medium">
                            {menu.name}
                          </TableCell>
                          <TableCell>
                            {menuItems.filter(
                              (item) => item.menu_id == menu.term_id
                            ).length > 0 ? (
                              <div className="border rounded p-2">
                                {renderMenuItems(
                                  menuItems
                                    .filter(
                                      (item) => item.menu_id == menu.term_id
                                    )
                                    .filter(
                                      (item) => item.menu_item_parent === "0"
                                    )
                                )}
                              </div>
                            ) : (
                              <div className="text-gray-500">
                                No items in this menu
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              onClick={() => {
                                setSelectedMenu(menu);
                                fetchMenuItems(menu.term_id);
                                setShowMenuItemModal(true);
                              }}
                            >
                              <Plus className="mr-2" /> Add Item
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Custom HTML & CSS Tab */}
              <TabsContent
                value="custom html & css"
                className="flex-1 p-6 overflow-auto"
              >
                <div className="text-center py-8 text-gray-500">
                  No custom HTML/CSS added
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
