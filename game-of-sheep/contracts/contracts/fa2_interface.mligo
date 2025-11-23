#if ! FA2_INTERFACE
#define FA2_INTERFACE

type token_id = nat

type transfer_destination =
[@layout:comb]
{
  to_ : address;
  token_id : token_id;
  amount : nat;
}

type transfer =
[@layout:comb]
{
  from_ : address;
  txs : transfer_destination list;
}

type balance_of_request =
[@layout:comb]
{
  owner : address;
  token_id : token_id;
}

type balance_of_response =
[@layout:comb]
{
  request : balance_of_request;
  balance : nat;
}

type balance_of_param =
[@layout:comb]
{
  requests : balance_of_request list;
  callback : (balance_of_response list) contract;
}

type operator_param =
[@layout:comb]
{
  owner : address;
  operator : address;
  token_id: token_id;
}

type update_operator =
[@layout:comb]
  | Add_operator of operator_param
  | Remove_operator of operator_param

type token_metadata =
[@layout:comb]
{
  token_id : token_id;
  token_info : (string, bytes) map;
}

(*
One of the options to make token metadata discoverable is to declare
`token_metadata : token_metadata_storage` field inside the FA2 contract storage
*)
type token_metadata_storage = (token_id, token_metadata) big_map

(**
Optional type to define view entry point to expose token_metadata on chain or
as an external view
 *)
type token_metadata_param = 
[@layout:comb]
{
  token_ids : token_id list;
  handler : (token_metadata list) -> unit;
}

type mint_tokens_params = {
  token_id : token_id;
  symbol : string;
  name : string;
  decimals : nat;
  exras : (string * string) list;
  total_supply : nat;
}

type mint_tokens_params_michelson = mint_tokens_params michelson_pair_right_comb

type fa2_entry_points =
  | Transfer of transfer_michelson list
  | Balance_of of balance_of_param_michelson
  | Update_operators of update_operator_michelson list
  | Token_metadata_registry of address_contract
  | Mint_tokens of mint_tokens_params_michelson

(* 
 TZIP-16 contract metadata storage field type. 
 The contract storage MUST have a field
 `metadata : contract_metadata`
*)
type contract_metadata = (string, bytes) big_map

(* FA2 hooks interface *)

type transfer_destination_descriptor =
[@layout:comb]
{
  to_ : address option;
  token_id : token_id;
  amount : nat;
}

type transfer_descriptor =
[@layout:comb]
{
  from_ : address option;
  txs : transfer_destination_descriptor list
}

type transfer_descriptor_param =
[@layout:comb]
{
  batch : transfer_descriptor list;
  operator : address;
}

(*
Entrypoints for sender/receiver hooks

type fa2_token_receiver =
  ...
  | Tokens_received of transfer_descriptor_param

type fa2_token_sender =
  ...
  | Tokens_sent of transfer_descriptor_param
*)

#endif
