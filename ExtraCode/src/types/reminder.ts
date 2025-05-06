export interface Reminder {
  id: string;
  title: string;
  time: string;
}

export type AppThunk<ReturnType = void> = (
  dispatch: ThunkDispatch<any, any, AnyAction>,
  getState: () => RootState
) => ReturnType;
