import React from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table/Table';
import SearchIcon from '@/components/icons/Search';
import TrashIcon from '@/components/icons/Trash';
import Input from '@/components/ui/form/Input';
import Badge from '@/components/ui/badge/Badge';
import Pagination from '@/components/ui/table/Pagination';
import useMenus from '../hooks/menus.hook';
import ChevronDownIcon from '@/components/icons/ChevronDown';
import { cn } from '@/libs/utils/cn.utils';

const MenusTable: React.FC = () => {
  const {
    isLoading,
    isFetching,
    data: menuGroups,
    error,
    meta,
    expandMenu,
    setMeta,
    onSearch,
    onRetry,
    onExpand,
    onDelete,
  } = useMenus();

  const tableStatus =
    isLoading || (error && isFetching) ? (
      'Loading...'
    ) : error ? (
      <div className="flex items-center gap-2">
        <span>{error}</span>
        <button onClick={onRetry} className="text-red-500 underline">
          Try again
        </button>
      </div>
    ) : menuGroups.length === 0 ? (
      'No menus found.'
    ) : null;

  return (
    <div className="widget-dark p-6 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between md:items-center">
        <div className="hidden md:block">
          <span className="text-lg font-semibold">Data Menus</span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="w-full sm:min-w-[300px]">
            <Input
              className="bg-ui-800 py-3 border-none"
              placeholder="Search groups..."
              icon={<SearchIcon className="w-5 h-5" />}
              iconPosition="left"
              onChange={onSearch}
            />
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableCell isHeader className="text-start">
              Groups
            </TableCell>
            <TableCell isHeader className="text-start">
              Description
            </TableCell>
            <TableCell isHeader className="text-center">
              Status
            </TableCell>
            <TableCell isHeader className="text-center">
              <></>
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableStatus ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-sm text-white/90">
                {tableStatus}
              </TableCell>
            </TableRow>
          ) : (
            menuGroups.map((list, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell className="text-start">{list.name}</TableCell>
                  <TableCell className="text-start">{list.desc}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="light" color={list.status === 1 ? 'success' : 'error'}>
                      {list.status === 1 ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center" onClick={() => onExpand(index, list)}>
                    <div
                      className={cn(
                        'flex justify-center transition-transform duration-300 cursor-pointer',
                        expandMenu === index ? 'rotate-180' : 'rotate-0',
                      )}
                    >
                      <ChevronDownIcon className="h-5 w-5" />
                    </div>
                  </TableCell>
                </TableRow>

                {/* EXPANDED */}
                {expandMenu === index && (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <div className="w-full">
                        <p className="text-lg font-semibold mb-4">Detail Menus</p>
                        <div>
                          <Table className="w-full">
                            <TableHeader>
                              <TableRow>
                                <TableCell isHeader className="text-start">
                                  Name
                                </TableCell>
                                <TableCell isHeader className="text-start">
                                  Path
                                </TableCell>
                                <TableCell isHeader className="text-center">
                                  Action
                                </TableCell>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {list.menus && list.menus.length > 0 ? (
                                list.menus.map((menu, idx) => (
                                  <TableRow key={idx} className="hover:bg-ui-800">
                                    <TableCell className="text-start">{menu.name}</TableCell>
                                    <TableCell className="text-start">{menu.path}</TableCell>
                                    <TableCell className="text-center">
                                      <div
                                        className="flex justify-center cursor-pointer"
                                        onClick={() => onDelete.mutate(menu.id)}
                                      >
                                        <TrashIcon className="w-5 h-5 text-red-600" />
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell
                                    colSpan={4}
                                    className="text-center text-sm text-white/90"
                                  >
                                    No menus found.
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))
          )}
        </TableBody>
      </Table>

      <Pagination
        meta={meta}
        context="menus"
        onPageChange={(page) => setMeta((prev) => ({ ...prev, page }))}
      />
    </div>
  );
};

export default MenusTable;
